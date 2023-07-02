import React, { FC, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { formatDistanceToNowStrict } from "date-fns";
import {
  RiChat3Line,
  RiHeart3Line,
  RiMoreFill,
  RiDeleteBinLine,
  RiPushpin2Line,
  RiUserUnfollowLine,
  RiEditLine,
} from "react-icons/ri";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

import { controlLink } from "@/utils/helpers";

import Avatar from "@/components/Avatar";

interface IPostFeedProps {
  username: string;
  data: Record<string, any>;
}

const PostFeed: FC<IPostFeedProps> = ({ data }) => {
  const [editPost, setEditPost] = useState(false);
  const [pin, setPin] = useState(false);

  const loginModal = useLoginModal();
  const router = useRouter();
  const { data: isLoggedIn } = useCurrentUser();

  const goToUser = useCallback(
    (event: React.MouseEvent<HTMLHeadingElement>) => {
      event.stopPropagation();

      router.push(`/users/${data?.user?.username}`);
    },
    [router, data?.user?.username]
  );

  const goToPost = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (editPost === false) {
        return;
      }
      /* @ts-ignore */
      if (isLoggedIn && event?.target?.id !== "external-url") {
        router.push(`/posts/${data?.id}`);
      }
    },
    [data?.id, router, isLoggedIn]
  );

  const onComment = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (!isLoggedIn) {
        return loginModal.onOpen();
      }
    },
    [isLoggedIn, loginModal]
  );

  const onLike = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (!isLoggedIn) {
        return loginModal.onOpen();
      }
    },
    [isLoggedIn, loginModal]
  );

  const postEdit = useCallback(
    (event: React.MouseEvent<SVGElement, MouseEvent>) => {
      event.stopPropagation();
      if (!isLoggedIn) {
        return loginModal.onOpen();
      }
      setEditPost((prevState) => !prevState);
    },
    [isLoggedIn, loginModal]
  );

  const postDelete = useCallback(
    async (id: any) => {
      if (!isLoggedIn) {
        return loginModal.onOpen();
      }
    },
    [isLoggedIn, loginModal]
  );
  const closePostEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const attributeValue = target.getAttribute("editPost-data");
    if (attributeValue === "editPost") return;
    setEditPost(false);
  };

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <>
      {editPost && (
        <div
          className="z-40 w-full h-full fixed top-0 left-0"
          onClick={(e) => closePostEdit(e)}
        />
      )}
      <div
        className="border-neutral-800 p-4 border-b transition hover:bg-neutral-900 cursor-pointer "
        onClick={goToPost}
      >
        <div className="flex items-start gap-4 relative">
          <Avatar username={data.user.username} size="small" />
          <div className="flex flex-col">
            <div className="flex gap-2 ">
              <h5
                className="text-white font-semibold cursor-pointer hover:underline"
                onClick={goToUser}
              >
                {data.user.name}
              </h5>
              <h6
                className="text-neutral-500 cursor-pointer hover:underline"
                onClick={goToUser}
              >
                @{data.user.username}
              </h6>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-500">{createdAt}</span>
            </div>
            <p
              className="text-white"
              dangerouslySetInnerHTML={{ __html: controlLink(data.body) }}
            >
              {}
            </p>
            <div className="flex gap-4">
              <div
                className="mt-2 flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-primary-main"
                onClick={onComment}
              >
                <RiChat3Line size={18} />
                <p>{data.Comment.length || 0}</p>
              </div>
              <div
                className="mt-2 flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
                onClick={onLike}
              >
                <RiHeart3Line size={18} />
                <p>{data.Comment.length || 0}</p>
              </div>
            </div>
          </div>
          <RiMoreFill
            className="absolute right-0 top-0"
            onClick={(e) => {
              postEdit(e);
            }}
          />
          <div
            className={`absolute w-72 right-0 top-0 bg-custom-black z-50 ${
              editPost ? "block shadow-customSecondary rounded-lg" : "hidden"
            }`}
            editPost-data="editPost"
          >
            {isLoggedIn && data?.user?.username === isLoggedIn?.username && (
              <>
                <p
                  className=" rounded hover:bg-custom-white hover:bg-opacity-10 w-full py-3 px-3 flex items-center gap-1 text-custom-externalRed font-bold"
                  onClick={(e) => {
                    postDelete(data.id);
                  }}
                >
                  <RiDeleteBinLine className="" />
                  Delete
                </p>
                <p
                  className=" rounded hover:bg-custom-white hover:bg-opacity-10 w-full py-3 px-3 flex items-center gap-1 text-custom-white font-bold"
                  onClick={(e) => {
                    postDelete(data.id);
                  }}
                >
                  <RiEditLine className="" />
                  Edit
                </p>

                <p
                  className=" rounded hover:bg-custom-white hover:bg-opacity-10 w-full py-3 px-3 flex items-center gap-1 font-bold text-custom-white"
                  onClick={() => {
                    setPin((prevState) => !prevState);
                  }}
                >
                  <RiPushpin2Line className="" />
                  {pin ? "Unpin from profile" : "Pin to profile"}
                </p>

                <p
                  className=" rounded hover:bg-custom-white hover:bg-opacity-10 w-full py-3 px-3 flex items-center gap-1 font-bold text-custom-white"
                  onClick={() => {}}
                >
                  <RiChat3Line className="" />
                  Change who can reply
                </p>
              </>
            )}

            {isLoggedIn && data?.user?.username !== isLoggedIn?.username && (
              <p
                className=" rounded hover:bg-custom-white hover:bg-opacity-10 w-full py-3 px-3 flex items-center gap-1 font-bold"
                onClick={() => {}}
              >
                <RiUserUnfollowLine className="" />
                Unfollow
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFeed;
