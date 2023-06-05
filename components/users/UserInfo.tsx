import { FC, useMemo } from "react";

import { format } from "date-fns";
import { BsBalloon } from "react-icons/bs";
import { RiCalendar2Line, RiLink, RiMapPinLine } from "react-icons/ri";

import ColorUtils from "@/base/colors";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";
import useUser from "@/hooks/useUser";

import { controlLink } from "@/utils/helpers";
import Button from "../shared/Button";

interface IUserInfoProps {
  username: string;
}

const UserInfo: FC<IUserInfoProps> = ({ username }) => {
  const { data: fetchedUser } = useUser(username);
  const { data: currentUser } = useCurrentUser();
  const { isFollowing, toggleFollow } = useFollow(username);

  const bioLink = fetchedUser?.bio ? controlLink(fetchedUser.bio) : "";
  const websiteLink = useMemo(() => {
    if (!fetchedUser?.website) {
      return null;
    }

    return fetchedUser?.website.includes("http") ||
      fetchedUser?.website.includes("https")
      ? fetchedUser?.website
      : `https://${fetchedUser?.website}`;
  }, [fetchedUser?.website]);

  const websiteText = useMemo(() => {
    if (!fetchedUser?.website) {
      return null;
    }

    return fetchedUser?.website.includes("http") ||
      fetchedUser?.website.includes("https")
      ? fetchedUser?.website.split("//")[1]
      : fetchedUser?.website;
  }, [fetchedUser?.website]);

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
        {currentUser?.username === username ? (
          <Button
            label="Edit profile"
            onClick={() => editModal.onOpen()}
            size="md"
            labelSize="sm"
            btnBlack
            hoverEnabled
            hoverText="Edit profile"
            hoverBgColor="hover:bg-custom-white"
            hoverOpacity="hover:!bg-opacity-10"
            color="black"
            labelWeight="semibold"
          />
        ) : (
          <Button
            label={isFollowing ? "Following" : "Follow"}
            btnBlack={isFollowing}
            secondary={!isFollowing}
            labelSize="sm"
            labelWeight="semibold"
            hoverEnabled={isFollowing}
            hoverText={isFollowing ? "Unfollow" : ""}
            hoverBgColor="hover:!bg-custom-redHover"
            hoverTextColor="hover:!text-custom-red"
            hoverBorderColor="hover:!border-custom-redHover"
            onClick={toggleFollow}
            size="md"
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

          {websiteLink ? (
            <div className="text-neutral-500 mt-2 flex items-center gap-2 mr-2">
              <RiLink size={18} />
              <a
                href={websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-main"
              >
                {websiteText}
              </a>
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
