import { useRouter } from "next/router";
import React from "react";

import ColorUtils from "@/base/colors";
import { IUser } from "@/types/user.type";

import Avatar from "./Avatar";
import Button from "./shared/Button";

interface WhoToFollowProps {
  suggestedUsers: IUser[];
}

const WhoToFollow: React.FC<WhoToFollowProps> = ({ suggestedUsers }) => {
  const router = useRouter();
  return (
    <div className="mt-8 ml-8 bg-custom-lightBlack rounded-2xl text-white w-[21rem] sticky top-4">
      <h2 className="text-xl text-neutral-100 font-black pt-4 pb-1 px-4">
        Who to follow
      </h2>
      <div className="my-2 pt-1 space-y-2">
        {suggestedUsers.map((user: IUser) => {
          return (
            <div
              onClick={() => {
                router.push(`/users/${user.username}`);
              }}
              key={user.id}
              className="flex items-center gap-4 justify-between py-2 px-4 hover:bg-neutral-700 hover:bg-opacity-70 cursor-pointer duration-200"
            >
              <Avatar username={user.username} size="small" />
              <div className="flex flex-col flex-1">
                <h3
                  className="text-white font-bold text-sm text-ellipsis w-fit max-w-[8rem] whitespace-nowrap overflow-hidden hover:underline text-left"
                  title={user.name}
                >
                  {user.name}
                </h3>
                <h5 className="text-gray-500 text-sm text-left">
                  @{user.username}
                </h5>
              </div>
              <div className=" font-medium flex items-end justify-items-end right-0">
                <Button
                  label="Follow"
                  bgColor="white"
                  secondary
                  size="sm"
                  labelSize="sm"
                />
              </div>
            </div>
          );
        })}
        <div
          className="rounded-b-2xl py-4 px-4 hover:bg-neutral-700 hover:bg-opacity-70 cursor-pointer duration-200"
          onClick={() => router.push("/connect")}
        >
          <p>
            <a
              style={{
                color: ColorUtils.colors.blue,
              }}
            >
              Show more
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhoToFollow;
