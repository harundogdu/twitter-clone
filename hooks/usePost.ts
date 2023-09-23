import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const usePost = (postId: string) => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    `/api/posts/${postId}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};

export default usePost;
