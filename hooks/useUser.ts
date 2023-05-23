import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useUser = (username: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    username ? `/api/users/${username}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
