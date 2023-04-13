import useUsers from "@/hooks/useUsers";
import { IUser } from "@/types/user.type";
import Avatar from "./Avatar";
import Button from "./shared/Button";

const ActionSidebar = () => {
  const { data: allUsers = [] } = useUsers();

  if (allUsers.length <= 0) {
    return null;
  }

  return (
    <div className="p-2">
      <div
        className="
        mt-4
        ml-8
              bg-neutral-800
              rounded-md    
              text-white
              w-full
           "
      >
        <h2 className="text-xl text-white font-semibold p-2">Who to follow</h2>
        <div className="my-2 pb-2 space-y-2">
          {allUsers.map((user: IUser) => {
            return (
              <div
                key={user.id}
                className="flex items-center gap-4 justify-between p-2 hover:bg-neutral-700 hover:bg-opacity-70 cursor-pointer duration-200"
              >
                <Avatar profileImage={user.profileImage} />
                <div className="flex flex-col flex-1">
                  <h3
                    className="text-white font-bold text-sm text-ellipsis max-w-full w-32 whitespace-nowrap overflow-hidden hover:underline text-left"
                    title={user.name}
                  >
                    {user.name}
                  </h3>
                  <h5 className="text-gray-500 text-sm text-left">
                    @{user.username}
                  </h5>
                </div>
                <Button
                  label="Follow"
                  bgColor="white"
                  color="black"
                  style={{
                    padding: "0.25rem 2rem",
                    fontSize: ".825rem",
                    fontWeight: "semibold",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActionSidebar;
