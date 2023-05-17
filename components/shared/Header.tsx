import { useRouter } from "next/router";
import { FC, useCallback } from "react";

import { RiArrowLeftLine } from "react-icons/ri";

interface IHeaderProps {
  showBackArrow?: boolean;
  label: string;
}

const Header: FC<IHeaderProps> = ({ label, showBackArrow = false }) => {
  const router = useRouter();

  const handleBackClick = useCallback(() => {
    if (Boolean(router.back())) {
      return router.back();
    }
    router.push("/");
  }, [router]);

  return (
    <div className="flex items-center z-10 border-b border-b-neutral-800 p-4 space-x-2 sticky top-0 backdrop-blur-xl">
      {showBackArrow ? (
        <RiArrowLeftLine
          className="text-gray-300 hover:text-white cursor-pointer mx-1 hover:bg-neutral-800 hover:bg-opacity-70 rounded-full transition-colors"
          size={24}
          onClick={handleBackClick}
        />
      ) : null}
      <h1 className="text-xl font-bold text-white">{label}</h1>
    </div>
  );
};

export default Header;
