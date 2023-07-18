import { useRouter } from "next/router";
import { FC, useCallback } from "react";

import { RiArrowLeftLine } from "react-icons/ri";

import useUser from "@/hooks/useUser";

interface IHeaderProps {
  showBackArrow?: boolean;
  label: string;
  isProfilePage?: boolean;
  userName?: string;
}

const Header: FC<IHeaderProps> = ({
  label,
  showBackArrow = false,
  isProfilePage = false,
  userName,
}) => {
  const router = useRouter();
  const { data: activeUser } = useUser(userName as string);

  const handleBackClick = useCallback(() => {
    if (Boolean(router.back())) {
      return router.back();
    }
    router.push("/");
  }, [router]);

  return (
    <div
      className={`flex items-center z-10 border-b border-b-neutral-800 ${
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
      </div>
    </div>
  );
};

export default Header;
