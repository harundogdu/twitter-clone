import { FC, useCallback, useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
  username?: string;
}

const PostForm: FC<IPostFormProps> = ({ placeholder, isComment, username }) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePost } = usePosts(username as string);

  const { data: isLoggedIn } = useCurrentUser();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [percentage, setPercentage] = useState(0);

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

  useEffect(() => {
    const calculatePercentage = () => {
      const currentLenght = body.length;
      const maxLength = 100;
      const calculatedPercentage = (currentLenght / maxLength) * 100;

      setPercentage(calculatedPercentage);
    };

    calculatePercentage();
  }, [body]);

  const getProgressbarStyle = () => {
    if (body.length > 0 && body.length < 80) {
      return buildStyles({
        rotation: 0,
        strokeLinecap: "butt",
        pathTransitionDuration: 0,
        trailColor: "#2F3336",
        pathColor: "#1D9BF0",
      });
    }
    if (body.length >= 80 && body.length < 100) {
      return buildStyles({
        rotation: 0,
        strokeLinecap: "butt",
        pathTransitionDuration: 0,
        textSize: "40px",
        textColor: "#71767b",
        trailColor: "#2F3336",
        pathColor: "#FFD400",
      });
    }
    if (body.length >= 100) {
      return buildStyles({
        rotation: 0,
        strokeLinecap: "butt",
        pathTransitionDuration: 0,
        textSize: "40px",
        textColor: "#F4212E",
        trailColor: "#2F3336",
        pathColor: "#F4212E",
      });
    }
  };

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
                size="custom"
                labelSize="base"
                labelWeight="semibold"
              />
            </div>
            <div className="py-2">
              <Button
                label="Sign up"
                onClick={handleRegisterClick}
                size="custom"
                labelSize="base"
                secondary
                labelWeight="semibold"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center p-4 gap-4 border-b border-neutral-800 ">
          <div className="self-start mt-2">
            <Avatar username={currentUser?.username} size="medium" />
          </div>
          <div className="w-full space-y-10">
            <textarea
              className="w-full resize-none outline-none bg-black mt-4 text-xl text-white placeholder-neutral-500 peer scrollbar-thin  scrollbar-thumb-neutral-500 scrollbar-track-neutral-800 scrollbar-thumb-rounded-md scrollbar-track-rounded-sm"
              placeholder={placeholder}
              value={body}
              onChange={(event) => setBody(event.target.value)}
              maxLength={150}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] transition-opacity border-neutral-800 w-full" />
            <div className="w-full flex justify-end">
              <div className="flex items-center px-5 cursor-pointer">
                {body.length > 0 && body.length < 80 && body.trim() ? (
                  <CircularProgressbar
                    className="w-5 h-5 ease-in duration-300"
                    value={percentage}
                    styles={getProgressbarStyle()}
                  />
                ) : body.length >= 80 && body.trim() ? (
                  <CircularProgressbar
                    className="w-7 h-7 ease-out duration-300"
                    value={percentage}
                    styles={getProgressbarStyle()}
                    text={`${100 - body.length}`}
                  />
                ) : null}
              </div>
              <Button
                disabled={loading || !body.trim() || body.length > 100}
                label="Tweet"
                onClick={handleSubmit}
                size="custom"
                labelSize="base"
                labelWeight="semibold"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostForm;
