import React, { FC, useMemo } from "react";

import { RiCalendar2Line, RiLink, RiMapPinLine } from "react-icons/ri";
import { BsBalloon } from "react-icons/bs";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";

import Button from "../shared/Button";

import { format } from "date-fns";
import Linkify from "../Linkify";

import { controlLink } from "@/utils/helpers";

interface IUserInfoProps {
  userId: string;
}

const UserInfo: FC<IUserInfoProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);
  const { data: currentUser } = useCurrentUser();

  const bioLink = fetchedUser?.bio ? controlLink(fetchedUser.bio) : "";
  const website = fetchedUser?.website ? controlLink(fetchedUser?.website) : "";

  const editModal = useEditModal();

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser?.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  const birthday = useMemo(() => {
    if (!fetchedUser?.birthday) {
      return null;
    }

    return format(new Date(fetchedUser?.birthday), "dd MMMM yyyy");
  }, [fetchedUser?.birthday]);

  return (
    <div className="border-neutral-800 border-b pb-4">
      <div className="p-4 flex justify-end">
        {currentUser?.id === userId ? (
          <Button
            label="Edit profile"
            bgColor="white"
            color="black"
            style={{
              padding: "0.5rem 1.5rem",
              fontWeight: "semibold",
            }}
            onClick={() => editModal.onOpen()}
          />
        ) : (
          <Button
            label="Follow"
            bgColor="white"
            color="black"
            style={{
              padding: ".5rem 2rem",
              fontWeight: "semibold",
            }}
          />
        )}
      </div>
      <div className="px-6">
        <div className="text-white text-2xl font-semibold">
          {fetchedUser?.name}
        </div>
        <div className="text-base text-neutral-400">
          @{fetchedUser?.username}
        </div>
        <p
          className="text-white mt-4"
          dangerouslySetInnerHTML={{ __html: bioLink }}
        ></p>

        <div className="items-center flex ">
          <div className="text-neutral-500 mt-2 flex items-center gap-2 mr-2">
            <RiCalendar2Line size={18} />
            <p>Joined {createdAt}</p>
          </div>
          {fetchedUser?.location ? (
            <div className="text-neutral-500 mt-2 flex items-center gap-2 mr-2">
              <RiMapPinLine size={18} />
              <p>{fetchedUser?.location}</p>
            </div>
          ) : null}

          {fetchedUser?.website ? (
            <div className="text-neutral-500 mt-2 flex items-center gap-2 mr-2">
              <RiLink size={18} />
              <p dangerouslySetInnerHTML={{ __html: website }}></p>
            </div>
          ) : null}

          {fetchedUser?.birthday ? (
            <div className="text-neutral-500 mt-2 flex items-center gap-2 mr-2">
              <BsBalloon size={18} />
              <p> {birthday}</p>
            </div>
          ) : null}
        </div>

        <div className="text-white flex gap-4 mt-6">
          <p className="cursor-pointer">
            {fetchedUser?.followingIds?.length}{" "}
            <span className="text-neutral-500">following</span>
          </p>
          <p className="cursor-pointer">
            {fetchedUser?.userFollowCount || 0}{" "}
            <span className="text-neutral-500">followers</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
