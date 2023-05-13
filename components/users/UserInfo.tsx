import React, { FC, useMemo } from "react";

import { RiCalendar2Line } from "react-icons/ri";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";

import Button from "../shared/Button";
import { format } from "date-fns";
import useEditModal from "@/hooks/useEditModal";

interface IUserInfoProps {
  userId: string;
}

const UserInfo: FC<IUserInfoProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);
  const { data: currentUser } = useCurrentUser();

  const controlLink = (text: string): string => {
    const userRegex = /@(\w+)/g;
    const urlRegex = /(?<!href=["']|["']>)\b\S+\.com\/\S+\b(?![^<]*?<\/a>)/g;
    let newText = text;

    if (userRegex.test(text)) {
      newText = newText.replace(
        userRegex,
        ' <a  href="$1" class="text-primary-main">@$1</a>'
      );
    }

    if (urlRegex.test(text)) {
      newText = newText.replace(
        urlRegex,
        '<a href="https://$&" target="_blank" class="text-primary-main">$&</a>'
      );
    }

    return newText;
  };

  const bioLink = fetchedUser?.bio ? controlLink(fetchedUser.bio) : "";

  const editModal = useEditModal();

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser?.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

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

        <div className="text-neutral-500 mt-2 flex items-center gap-2">
          <RiCalendar2Line size={18} />
          <p>Joined {createdAt}</p>
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
