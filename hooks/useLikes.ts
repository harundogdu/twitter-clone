import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import usePosts from "./usePosts";
import toast from "react-hot-toast";

const useLikes = ({ postId, userId }: { postId: string; userId: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutatePost } = usePost(postId);
  const { mutate: mutatePosts } = usePosts();
  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];
    return list.includes(currentUser?.id || "");
  }, [currentUser, fetchedPost]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete(`/api/likes`, { data: { postId } });
      } else {
        request = () => axios.post(`/api/likes`, { postId });
      }

      await request();
      mutatePost();
      mutatePosts();

      toast.success("Success");
    } catch (error: any) {
      console.log(error);
      toast.error("Failed");
    }
  }, [currentUser, hasLiked, loginModal, mutatePost, mutatePosts, postId]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLikes;
