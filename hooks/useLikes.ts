import { useCallback, useMemo, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import useUser from "@/hooks/useUser";
import { is } from "date-fns/locale";
import { set } from "lodash";

const useLikes = (userName: string, postId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedUser, mutate: mutateFetchedUser } = useUser(userName);
  const [tempIsLiked, setTempIsLiked] = useState(false);

  const loginModal = useLoginModal();

  const onLike = useCallback(() => {
    debugger;
    const list = currentUser?.likes || [];

    const _isLiked = list.map((like: any) => like.postId).includes(postId);
    setTempIsLiked(_isLiked);
  }, [currentUser, postId]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    try {
      let request;

      if (tempIsLiked) {
        console.log("if içi");
        request = () =>
          axios.delete(`/api/posts/like/`, {
            data: { postId },
          });
      } else {
        console.log("else içi");
        request = () =>
          axios.post(`/api/posts/like/`, {
            postId,
          });
      }

      await request();

      mutateCurrentUser();
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to like post");
    }
  }, [currentUser, postId, tempIsLiked, loginModal, mutateCurrentUser]);

  useEffect(() => {
    toggleLike();
  }, [tempIsLiked]);

  return {
    tempIsLiked,
    onLike,
  };
};
export default useLikes;
