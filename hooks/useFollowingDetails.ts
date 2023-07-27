import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useFollowingDetails = (username: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/following?username=${username}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFollowingDetails;
