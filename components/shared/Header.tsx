import { useRouter } from "next/router";
import React, { FC, useCallback } from "react";

import { RiArrowLeftLine } from "react-icons/ri";

import useUser from "@/hooks/useUser";
import { fetchData } from "next-auth/client/_utils";

interface IHeaderProps {
  showBackArrow?: boolean;
  label: string;
  labelUsername?: string;
  isProfilePage?: boolean;
  userName?: string;
  isFollowPage?: boolean;
}

const Header: FC<IHeaderProps> = ({
  label,
  labelUsername,
  showBackArrow = false,
  isProfilePage = false,
  userName,
  isFollowPage = false,
}) => {
  const router = useRouter();
  const { data: activeUser } = useUser(userName as string);

  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div
      className={`flex items-center z-10  ${
        !isFollowPage ? "border-b border-b-neutral-800" : "border-none"
      }
      ${
        isProfilePage ? "p-2 py-0" : "p-4"
      } space-x-2 sticky top-0 backdrop-blur-xl`}
    >
      {showBackArrow ? (
        <RiArrowLeftLine
          className="text-gray-300 hover:text-white cursor-pointer mx-1 hover:bg-neutral-800 hover:bg-opacity-70 rounded-full transition-colors"
          size={24}
          onClick={handleBackClick}
        />
      ) : null}
      <div className="pl-2 py-2">
        <h1 className="text-xl font-bold text-white">{label}</h1>
        {isProfilePage ? (
          <h3 className="text-sm text-neutral-500">
            {activeUser?.userTwitCount} Tweets
          </h3>
        ) : null}
        {isFollowPage ? (
          <div>
            <h3 className="text-sm text-neutral-500">@{labelUsername}</h3>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
