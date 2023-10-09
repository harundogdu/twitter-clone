import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useNotifications = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;
  const { data, error, mutate, isLoading } = useSWR(url, fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useNotifications;
