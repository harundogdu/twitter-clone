import React from "react";

import { useRouter } from "next/router";

import ClipLoader from "react-spinners/ClipLoader";

import useUser from "@/hooks/useUser";

import Header from "@/components/shared/Header";
import UserHero from "@/components/users/UserHero";
import UserInfo from "@/components/users/UserInfo";
import PostFeeds from "@/components/posts/PostFeeds";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <div>
      <Header label={fetchedUser?.name} showBackArrow />
      <UserHero userId={userId as string} />
      <UserInfo userId={userId as string} />
      <PostFeeds userId={userId as string} />
    </div>
  );
};

export default UserView;
