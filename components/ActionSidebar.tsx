import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import { IUser } from "@/types/user.type";

import SearchBar from "./Searchbar";
import WhoToFollow from "./WhoToFollow";
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
    <div className="p-2 sticky top-1 z-50">
      <SearchBar />
      <WhoToFollow suggestedUsers={suggestedUsers} />
    </div>
  );
};

export default ActionSidebar;
