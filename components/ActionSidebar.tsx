import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import { IUser } from "@/types/user.type";

import ColorUtils from "@/base/colors";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUsers from "@/hooks/useUsers";

import Avatar from "@/components/Avatar";
import Button from "@/components/shared/Button";

const ActionSidebar = () => {
  const { data: allUsers = [] } = useUsers();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const [suggestedUsers, setSuggestedUsers] = useState<IUser[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const moreRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (allUsers.length > 0 && currentUser) {
      const shuffledUsers = [...allUsers];

      shuffledUsers.sort(() => Math.random() * allUsers.length);

      const selectedUsers = shuffledUsers.slice(0, 3);
      setSuggestedUsers(selectedUsers);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [allUsers, currentUser, moreRef]);

  if (suggestedUsers.length <= 0 || !currentUser) {
    return null;
  }

  if (router.pathname === "/connect") {
    return null;
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-2">
      <div className="sticky top-4">
        <div className="mt-8 ml-8 bg-neutral-800 rounded-2xl text-white w-[21rem]">
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
                  <div className="font-medium flex items-end justify-items-end right-0">
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
        <div className=" w-[21rem] ml-8 relative">
          <nav
            aria-label="Footer"
            role="navigation"
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500 pl-4 pt-2"
          >
            <a
              href="https://twitter.com/en/tos"
              target="_blank"
              className="hover:underline"
            >
              <span>Terms of Service</span>
            </a>
            <a
              href="https://twitter.com/en/privacy"
              target="_blank"
              className="hover:underline"
            >
              <span>Privacy Policy</span>
            </a>
            <a href="#" target="_blank" className="hover:underline">
              <span>Cookie Policy</span>
            </a>
            <a href="#" target="_blank" className="hover:underline">
              <span>Imprint</span>
            </a>
            <a href="#" target="_blank" className="hover:underline">
              <span>Accessibility</span>
            </a>
            <a href="#" target="_blank" className="hover:underline">
              <span>Ads info</span>
            </a>
            <span
              ref={moreRef}
              className="cursor-pointer hover:underline flex justify-between items-center relative"
              onClick={togglePopup}
            >
              More ···
              {isOpen && (
                <div className="absolute block shadow-customSecondary rounded-lg top-0 right-0  bg-custom-black w-44 z-50">
                  <p
                    className="rounded hover:bg-custom-white hover:bg-opacity-10 w-full py-3 px-3 flex items-center gap-1 font-bold text-custom-white text-base"
                    onClick={(e) => {}}
                  >
                    About
                  </p>
                  <p
                    className="rounded hover:bg-custom-white hover:bg-opacity-10 w-full py-3 px-3 flex items-center gap-1 text-custom-white font-bold text-base"
                    onClick={(e) => {}}
                  >
                    Status
                  </p>
                  <p
                    className="rounded hover:bg-custom-white hover:bg-opacity-10 w-full py-3 px-3 flex items-center gap-1 text-custom-white font-bold text-base"
                    onClick={(e) => {}}
                  >
                    Twitter for Business
                  </p>
                  <p
                    className="rounded hover:bg-custom-white hover:bg-opacity-10 w-full py-3 px-3 flex items-center gap-1 text-custom-white font-bold text-base"
                    onClick={(e) => {}}
                  >
                    Developers
                  </p>
                </div>
              )}
            </span>
            <span>© 2023 X Crop.</span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ActionSidebar;
