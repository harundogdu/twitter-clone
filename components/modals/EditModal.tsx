import { useCallback, useEffect, useMemo, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";

import ImageUpload from "../ImageUpload";
import Input from "../shared/Input";
import Modal from "../shared/Modal";

const EditModal = () => {
  const editModal = useEditModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateUser } = useUser(currentUser?.username);

  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    bio: "",
    profileImage: "",
    coverImage: "",
  });

  useEffect(() => {
    setUserInfo({
      bio: currentUser?.bio,
      coverImage: currentUser?.coverImage,
      name: currentUser?.name,
      profileImage: currentUser?.profileImage,
      username: currentUser?.username,
    });
  }, [
    currentUser?.bio,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.profileImage,
    currentUser?.username,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name: userInfo.name,
        bio: userInfo.bio,
        username: userInfo.username,
        profileImage: userInfo.profileImage,
        coverImage: userInfo.coverImage,
      });

      mutateUser();
      toast.success("Updated");
      editModal.onClose();
    } catch (error: any) {
      toast.error(error.response.data || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [
    editModal,
    mutateUser,
    userInfo.bio,
    userInfo.coverImage,
    userInfo.name,
    userInfo.profileImage,
    userInfo.username,
  ]);

  const bodyContent = useMemo(
    () => (
      <div className="space-y-4">
        <ImageUpload
          label="Profile Image"
          value={userInfo.profileImage}
          onChange={(image) =>
            setUserInfo({ ...userInfo, profileImage: image })
          }
        />
        <ImageUpload
          label="Cover Image"
          value={userInfo.coverImage}
          onChange={(image) => setUserInfo({ ...userInfo, coverImage: image })}
        />
        <Input
          value={userInfo.name}
          onChange={(event) =>
            setUserInfo({ ...userInfo, name: event.target.value })
          }
          type="text"
          placeholder="Name"
        />
        <Input
          value={userInfo.username}
          onChange={(event) =>
            setUserInfo({ ...userInfo, username: event.target.value })
          }
          type="text"
          placeholder="Username"
          disabled
        />
        <Input
          value={userInfo.bio}
          onChange={(event) =>
            setUserInfo({ ...userInfo, bio: event.target.value })
          }
          type="text"
          placeholder="Bio"
        />
      </div>
    ),
    [userInfo]
  );

  return (
    <Modal
      title="Edit your profile"
      isOpen={editModal.isOpen}
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={handleSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
