import { FC, useCallback, useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import ColorUtils from "@/base/colors";

import { RiCloseFill } from "react-icons/ri";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import usePosts from "@/hooks/usePosts";
import useCurrentUser from "@/hooks/useCurrentUser";
import useTweetActionModal from "@/hooks/useTweetActionModal";

import Avatar from "@/components/Avatar";
import Button from "@/components/shared/Button";

interface IPostFormProps {
  username?: string;
}
const TweetModal: FC<IPostFormProps> = ({ username }) => {
  const tweetModal = useTweetActionModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePost } = usePosts(username as string);

  const [percentage, setPercentage] = useState(0);

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

  const handleClose = useCallback(() => {
    tweetModal.onClose();
  }, [tweetModal]);

  if (tweetModal.isOpen) return null;

  return (
    <>
      <div className="flex justify-center items-start  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all duration-300 bg-neutral-700 bg-opacity-70">
        <div className="relative my-20  h-full w-full lg:w-[600px] lg:h-72">
          {/*content*/}
          <div className="rounded-lg border-0 bg-black flex flex-col h-full shadow-lg outline-none focus:outline-none relative w-full">
            <div className="flex justify-end items-center p-4 rounded-t">
              <h5 className="text-3xl font-semibold text-white">{}</h5>
              <button
                onClick={handleClose}
                className="p-1 border-0 hover:opacity-70 transition"
              >
                <RiCloseFill size={28} color={"#fff"} />
              </button>
            </div>

            <div className="flex justify-center items-start space-x-4">
              <div>
                <Avatar
                  username={currentUser?.username}
                  size="small"
                  clickable={false}
                />
              </div>

              <div className="w-3/4">
                <textarea
                  autoFocus={tweetModal.isOpen ? false : true}
                  className="w-full resize-none outline-none bg-black mt-4 text-xl text-white placeholder-neutral-500 peer scrollbar-thin  scrollbar-thumb-neutral-500 scrollbar-track-neutral-800 scrollbar-thumb-rounded-md scrollbar-track-rounded-sm"
                  placeholder="What's happening?"
                  value={body}
                  onChange={(event) => {
                    setBody(event.target.value);
                    event.target.style.height = "84px";
                    event.target.style.height = event.target.scrollHeight + "0";
                  }}
                  maxLength={150}
                ></textarea>
              </div>
            </div>

            <div className="flex-col gap-2 p-4 items-center justify-center inset-x-0 absolute bottom-0 ">
              <hr className="opacity-100 h-[1px] transition-opacity border-neutral-800 w-full " />
              <div className="w-full flex justify-end mt-3 ">
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
                  disabled={loading || !body || body.length > 100}
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
        </div>
      </div>
    </>
  );
};

export default TweetModal;
