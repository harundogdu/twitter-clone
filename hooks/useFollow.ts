import { useCallback, useMemo } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import useUser from "@/hooks/useUser";

const useFollow = (userName: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedUser, mutate: mutateFetchedUser } = useUser(userName);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(fetchedUser?.id || "");
  }, [currentUser, fetchedUser]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    try {
      let request;

      if (isFollowing) {
        request = () =>
          axios.delete(`/api/follow`, {
            data: {
              username: fetchedUser?.username,
            },
          });
      } else {
        request = () =>
          axios.post(`/api/follow`, {
            username: fetchedUser?.username,
          });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to follow user");
    }
  }, [
    currentUser,
    fetchedUser?.username,
    isFollowing,
    loginModal,
    mutateCurrentUser,
    mutateFetchedUser,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
