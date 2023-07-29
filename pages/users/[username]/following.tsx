import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import useFollowingDetails from "@/hooks/useFollowingDetails";

import UserFollowing from "@/components/follow/UserFollowing";
import FollowPage from "@/components/shared/FollowPage";

const Following: React.FunctionComponent = () => {
  const router = useRouter();
  const { username } = router.query;
  const { data: userDetails } = useFollowingDetails(username as string);

  if (userDetails?.following.length === 0) {
    return (
      <>
        <FollowPage />

        <div className="flex items-center justify-center flex-col w-full h-1/2">
          <div className="flex mb-8">
            <img
              src="https://abs.twimg.com/responsive-web/client-web/yellow-birds-power-line-400x200.v1.7e3b99f9.png"
              alt="noFollowing"
            />
          </div>
          <h2 className="text-white w-1/2  text-left text-3xl font-extrabold mb-1">
            @{username} isn’t <br /> following anyone
          </h2>
          <p className="text-neutral-600 w-1/2  text-left">
            Once they follow accounts, they’ll show up here.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <FollowPage />
      <UserFollowing username={username as string} />
    </>
  );
};

export default Following;
