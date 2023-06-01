import React, { useCallback, useEffect, useMemo, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
/* import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; */
/* import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css"; */
import { format } from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";

import ImageUpload from "../ImageUpload";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import BasicDatePicker from "../shared/BasicDatePicker";
import dayjs, { Dayjs } from "dayjs";

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
    location: "",
    website: "",
    birthday: "",
  });

  useEffect(() => {
    setUserInfo({
      bio: currentUser?.bio,
      coverImage: currentUser?.coverImage,
      name: currentUser?.name,
      profileImage: currentUser?.profileImage,
      username: currentUser?.username,
      location: currentUser?.location,
      website: currentUser?.website,
      birthday: currentUser?.birthday,
    });
  }, [
    currentUser?.bio,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.profileImage,
    currentUser?.username,
    currentUser?.location,
    currentUser?.website,
    currentUser?.birthday,
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [formattedBirthday, setFormattedBirthday] = useState(
    format(new Date(), "dd MMMM yyyy")
  );
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        name: userInfo.name,
        bio: userInfo.bio,
        username: userInfo.username,
        profileImage: userInfo.profileImage,
        coverImage: userInfo.coverImage,
        location: userInfo.location,
        website: userInfo.website,
        birthday: userInfo.birthday,
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
    userInfo.location,
    userInfo.website,
    userInfo.birthday,
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
          multiline
          rows={3}
        />
        <Input
          value={userInfo.location}
          onChange={(event) => {
            setUserInfo({ ...userInfo, location: event.target.value });
          }}
          type="text"
          placeholder="Location"
        />
        <Input
          value={userInfo?.website?.trim()}
          onChange={(event) =>
            setUserInfo({ ...userInfo, website: event?.target?.value?.trim() })
          }
          type="text"
          placeholder="Website"
        />
        {/*   <Input
          value={formattedBirthday}
          onChange={(event) => {
            setUserInfo({ ...userInfo, birthday: event.target.value });
            setFormattedBirthday(
              format(new Date(event.target.value), "dd MMMM yyyy")
            );
          }}
          type="text"
          placeholder="birthday"
        /> */}
        {/*   <BasicDatePicker
          label={"Birthday"}
          defaultValue={format(new Date(), "dd MMMM yyyy")}
        /> */}
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
