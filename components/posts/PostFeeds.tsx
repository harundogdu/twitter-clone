import React, { FC } from "react";
import { RiLoader5Line } from "react-icons/ri";

import ColorUtils from "@/base/colors";

import usePosts from "@/hooks/usePosts";

import PostFeed from "@/components/posts/PostFeed";

interface IPostFeedsProps {
  userId?: string;
  username?: string;
}

const PostFeeds: FC<IPostFeedsProps> = ({ userId, username }) => {
  const { data: posts = [], isLoading } = usePosts(userId as string);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full mt-8">
        <span className="bg-gray-900 rounded-full bg-neutral-700 ">
          <RiLoader5Line
            className="
            animate-spin
            text-4xl
            rounded-full
            "
            style={{ color: ColorUtils.colors.main }}
          />
        </span>
      </div>
    );
  }

  return (
    <>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post: Record<string, any>) => (
          <PostFeed key={post.id} username={username!} data={post} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full mt-8">
          <p className="text-lg text-neutral-500">
            {username ? "No posts yet" : "Your followings have no posts yet"}
          </p>
        </div>
      )}
    </>
  );
};

export default PostFeeds;
