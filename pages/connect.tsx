import { FC, useCallback } from "react";
import { useRouter } from "next/router";

import { IUser } from "@/types/user.type";
import Avatar from "@/components/Avatar";

import { RiArrowLeftLine } from "react-icons/ri";

import useUsers from "@/hooks/useUsers";
import useFollow from "@/hooks/useFollow";

import Button from "@/components/shared/Button";

interface IHeaderProps {
  username: string;
  showBackArrow?: boolean;
  label: string;
  isProfilePage?: boolean;
}

const Connect: FC<IHeaderProps> = ({ showBackArrow = false, username }) => {
  const { data: allUsers = [] } = useUsers();
  const router = useRouter();
  const { isFollowing, toggleFollow } = useFollow(username);

  const handleBackClick = useCallback(() => {
    const referrer = document.referrer;
    if (referrer) {
      return router.back();
    }
    router.push("/");
  }, [router]);

  return (
    <>
      <div
        className={`flex items-center z-10 py-2 pl-2 space-x-2 sticky top-0 backdrop-blur-xl`}
      >
        <RiArrowLeftLine
          className="text-gray-300 hover:text-white cursor-pointer mx-1 hover:bg-neutral-800 hover:bg-opacity-70 rounded-full transition-colors"
          size={24}
          onClick={handleBackClick}
        />
        <div className="pl-4 py-2">
          <h1 className="text-xl font-bold text-neutral-200">Connect</h1>
        </div>
      </div>
      <div>
        <h1 className="text-neutral-100   py-3 pl-4 font-bold text-xl">
          Su<span className="font-serif font-extrabold">gg</span>ested for you
        </h1>
        {allUsers.map((user: IUser) => {
          return (
            <div
              key={user.id}
              className="flex items-start  gap-4 justify-between  py-5 px-4 hover:bg-neutral-700 hover:bg-opacity-70 cursor-pointer duration-200"
            >
              <Avatar username={user.username} size="small" />
              <div
                className="flex flex-col flex-1"
                onClick={() => {
                  router.push(`/users/${user.username}`);
                }}
              >
                <h3
                  className="text-white font-bold  text-[0.950rem] text-ellipsis w-fit max-w-[10rem] whitespace-nowrap overflow-hidden hover:underline text-left"
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
              <div className="font-medium flex self-center  items-end justify-items-end right-0">
                <Button
                  label={isFollowing ? "Following" : "Follow"}
                  btnBlack={isFollowing}
                  secondary={!isFollowing}
                  bgColor="white"
                  hoverEnabled={isFollowing}
                  hoverText={isFollowing ? "Unfollow" : ""}
                  size="sm"
                  labelSize="sm"
                  onClick={toggleFollow}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connect;
