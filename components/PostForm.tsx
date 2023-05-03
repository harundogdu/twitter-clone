import { FC, useCallback, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import ColorUtils from "@/base/colors";

import Avatar from "./Avatar";
import Button from "./shared/Button";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";

interface IPostFormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const PostForm: FC<IPostFormProps> = ({ placeholder, isComment, postId }) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePost } = usePosts(postId as string);

  const { data: isLoggedIn } = useCurrentUser();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const handleLoginClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  const handleRegisterClick = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const [body, setBody] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      await axios.post("/api/posts", { body });

      toast.success("Post created!");

      setBody("");
      mutatePost();
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, [body, mutatePost]);
  return (
    <>
      {!isLoggedIn ? (
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl text-white font-bold text-center mt-5">
            Welcome to Twitter
          </h1>
          <div className="text-white flex justify-center gap-4 p-5 border-b-[1px] border-neutral-800">
            <div className="py-2">
              <Button
                label="Log in"
                onClick={handleLoginClick}
                style={{
                  padding: ".5rem 1rem",
                  background: ColorUtils.colors.main,
                  color: ColorUtils.colors.white,
                }}
              />
            </div>
            <div className="py-2">
              <Button
                label="Sign up"
                onClick={handleRegisterClick}
                style={{
                  padding: "0.5rem 1rem",
                  background: ColorUtils.colors.white,
                  color: ColorUtils.colors.black,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center p-4 gap-4 border-b border-neutral-800 ">
          <div className="self-start mt-2">
            <Avatar userId={currentUser?.id} size="medium" />
          </div>
          <div className="w-full space-y-4">
            <textarea
              className="w-full resize-none outline-none bg-black mt-4 text-xl text-white placeholder-neutral-500 peer"
              placeholder={placeholder}
              value={body}
              onChange={(event) => setBody(event.target.value)}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] transition-opacity border-neutral-800 w-full" />
            <div className="w-full flex justify-end">
              <Button
                disabled={loading || !body}
                label="Tweet"
                style={{
                  padding: ".5rem 1rem",
                  background: ColorUtils.colors.main,
                  color: ColorUtils.colors.white,
                }}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostForm;
