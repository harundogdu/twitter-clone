import { IUser } from "@/types/user.type";
import { useRouter } from "next/router";
import Avatar from "./Avatar";

import ColorUtils from "@/base/colors";

import Button from "./shared/Button";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUsers from "@/hooks/useUsers";

const ActionSidebar = () => {
  const { data: allUsers = [] } = useUsers();
  const { data: currentUser } = useCurrentUser();

  if (allUsers.length <= 0 || !currentUser) {
    return null;
  }

  return (
    <div className="p-2">
      <div className="mt-4 ml-8 bg-neutral-800 rounded-lg text-white w-[21rem] sticky top-10">
        <h2 className="text-xl text-white font-black pt-4 pb-1 px-4">
          Who to follow
        </h2>
        <div className="my-2 pb-4 pt-1 space-y-2">
          {allUsers.map((user: IUser) => {
            return (
              <div
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
                    color="black"
                    style={{
                      padding: "0.35rem 1.25rem",
                      fontSize: ".875rem",
                      fontWeight: "semibold",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActionSidebar;
