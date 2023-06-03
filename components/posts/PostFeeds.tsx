import React, { FC } from "react";

import usePosts from "@/hooks/usePosts";

import PostFeed from "./PostFeed";
import useUser from "@/hooks/useUser";

interface IPostFeedsProps {
  userId?: string;
  username?: string;
}

const PostFeeds: FC<IPostFeedsProps> = ({ userId, username }) => {
  const { data: posts = [] } = usePosts(userId as string);

  return (
    <>
      {Array.isArray(posts) && posts.length > 1000 ? (
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
