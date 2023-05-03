import React, { FC } from "react";

import usePosts from "@/hooks/usePosts";

import PostFeed from "./PostFeed";

interface IPostFeedsProps {
  userId?: string;
}

const PostFeeds: FC<IPostFeedsProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId as string);

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostFeed key={post.id} userId={post.userId} data={post} />
      ))}
    </>
  );
};

export default PostFeeds;
