/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import useFollowingDetails from "@/hooks/useFollowingDetails";
import useUser from "@/hooks/useUser";

import UserFollowers from "@/components/follow/UserFollowers";
import FollowPage from "@/components/shared/FollowPage";

const Followers: React.FunctionComponent = () => {
  const router = useRouter();
  const { username } = router.query;
  const { isLoading } = useUser(username as string);
  const { data: userDetails } = useFollowingDetails(username as string);

  if (userDetails?.followers.length === 0) {
    return (
      <>
        <FollowPage />
        <div className="flex items-center justify-center flex-col w-full h-1/2">
          <div className="flex mb-8">
            <img
              src="https://abs.twimg.com/responsive-web/client-web/yellow-birds-power-line-400x200.v1.7e3b99f9.png"
              alt="noFollowers"
            />
          </div>
          <h2 className="text-white w-1/2  text-left text-3xl font-extrabold mb-1">
            Looking for <br /> followers?
          </h2>
          <p className="text-neutral-600 w-1/2  text-left">
            When someone follows this account, they’ll show up here. Tweeting
            and interacting with others helps boost followers.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <FollowPage />
      <UserFollowers username={username as string} />
    </>
  );
};

export default Followers;
