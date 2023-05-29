import React, { FC, useCallback, useMemo } from "react";

import { useRouter } from "next/router";

import { formatDistanceToNowStrict } from "date-fns";

import { RiChat3Line, RiHeart3Line } from "react-icons/ri";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

import { controlLink } from "@/utils/helpers";

import Avatar from "../Avatar";

interface IPostFeedProps {
  username: string;
  data: Record<string, any>;
}

const PostFeed: FC<IPostFeedProps> = ({ data }) => {
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
      if (isLoggedIn) {
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

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div
      className="border-neutral-800 p-4 border-b transition hover:bg-neutral-900 cursor-pointer "
      onClick={goToPost}
    >
      <div className="flex items-start gap-4">
        <Avatar username={data.user.username} size="small" />
        <div className="flex flex-col">
          <div className="flex gap-2">
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
      </div>
    </div>
  );
};

export default PostFeed;
