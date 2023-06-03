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
  const { username } = router.query;
  const { data: fetchedUser, isLoading } = useUser(username as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <div>
      <Header
        label={fetchedUser?.name}
        showBackArrow
        isProfilePage
        userName={fetchedUser?.username}
      />
      <UserHero username={username as string} />
      <UserInfo username={username as string} />
      <PostFeeds username={username as string} userId={fetchedUser.id} />
    </div>
  );
};

export default UserView;
