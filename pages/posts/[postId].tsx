import React from "react";
import { useRouter } from "next/router";

import { ClipLoader } from "react-spinners";

import PostForm from "@/components/PostForm";
import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/shared/Header";
import CommentFeed from "@/components/posts/CommentFeed";

import usePost from "@/hooks/usePost";

const PostDetail = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: postData, isLoading } = usePost(postId as string);

  if (isLoading || !postData) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full mt-8">
        <ClipLoader color="#ffffff" />
      </div>
    );
  }

  return (
    <main>
      <Header label="Tweet" showBackArrow />
      <PostFeed data={postData} />
      <PostForm
        placeholder="Tweet your reply"
        isComment
        postId={postId as string}
      />
      <CommentFeed comments={postData?.Comment} />
    </main>
  );
};

export default PostDetail;
