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
      {posts.map((post: Record<string, any>) => (
        <PostFeed key={post.id} username={username!} data={post} />
      ))}
    </>
  );
};

export default PostFeeds;
