import React, { FC } from "react";

import usePosts from "@/hooks/usePosts";

import PostFeed from "./PostFeed";
import useUser from "@/hooks/useUser";

import Loading from "@/components/shared/Loading";

interface IPostFeedsProps {
  userId?: string;
  username?: string;
}

const PostFeeds: FC<IPostFeedsProps> = ({ userId, username }) => {
  const { data: posts = [], isLoading } = usePosts(userId as string);

  if (isLoading) return <Loading />;

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostFeed key={post.id} username={username!} data={post} />
      ))}
    </>
  );
};

export default PostFeeds;
