import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { IUser } from "@/types/user.type";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUsers from "@/hooks/useUsers";

import SearchBar from "./Searchbar";
import WhoToFollow from "./WhoToFollow";

const ActionSidebar = () => {
  const { data: allUsers = [] } = useUsers();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const [suggestedUsers, setSuggestedUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (allUsers.length > 0 && currentUser) {
      const shuffledUsers = [...allUsers];

      shuffledUsers.sort(() => Math.random() * allUsers);

      const selectedUsers = shuffledUsers.slice(0, 3);
      setSuggestedUsers(selectedUsers);
    }
  }, [allUsers, currentUser]);

  if (suggestedUsers.length <= 0 || !currentUser) {
    return null;
  }

  if (router.pathname === "/connect") {
    return null;
  }

  return (
    <div className="p-2 sticky top-1 z-50">
      <SearchBar />
      <WhoToFollow suggestedUsers={suggestedUsers} />
    </div>
  );
};

export default ActionSidebar;
