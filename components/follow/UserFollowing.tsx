import React, { FC } from "react";

import { useRouter } from "next/router";

import { RiLoader5Line } from "react-icons/ri";

import ColorUtils from "@/base/colors";

import useFollowingDetails from "@/hooks/useFollowingDetails";
import useFollow from "@/hooks/useFollow";
import useCurrentUser from "@/hooks/useCurrentUser";

import Avatar from "@/components/Avatar";
import Button from "@/components/shared/Button";

interface IFollowingsUser {
  username: string;
}

const UserFollowing: FC<IFollowingsUser> = ({ username }) => {
  const router = useRouter();
  const { data: userDetails } = useFollowingDetails(username);
  const { data: isLoggedIn } = useCurrentUser();
  const { isFollowing, toggleFollow } = useFollow(username);

  return (
    <>
      {userDetails?.following.length > 0 ? (
        userDetails.following.map((user: any) => {
          const isCurrentUser = isLoggedIn?.username === user?.username;

          return (
            <div
              key={user.id}
              className="flex items-start gap-4 justify-between py-5 px-4 hover:bg-neutral-700 hover:bg-opacity-70 cursor-pointer duration-200"
            >
              <Avatar username={user.username} size="small" />
              <div
                className="flex flex-col flex-1"
                onClick={() => {
                  router.push(`/users/${user.username}`);
                }}
              >
                <h3
                  className="text-white font-bold text-[0.950rem] text-ellipsis w-fit max-w-[10rem] whitespace-nowrap overflow-hidden hover:underline text-left"
                  title={user.name}
                >
                  {user.name}
                </h3>
                <h5 className="text-gray-500 text-sm text-left">
                  @{user.username}
                </h5>
                <h4 className="text-white text-[0.925rem] text-ellipsis w-fit max-w-[20rem] whitespace-nowrap overflow-hidden hover:underline text-left">
                  {user.bio}
                </h4>
              </div>
              <div className="font-medium flex self-center items-end justify-items-end right-0">
                {!isCurrentUser ? (
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
                    size="sm"
                  />
                ) : null}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center w-full  mt-8">
          <RiLoader5Line
            className="
            animate-spin
            text-4xl
            rounded-full
            "
            style={{ color: ColorUtils.colors.main }}
          />
        </div>
      )}
    </>
  );
};

export default UserFollowing;
