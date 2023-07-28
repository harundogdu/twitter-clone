import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import Header from "@/components/shared/Header";

const FollowPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const { data: fetchUser } = useUser(username as string);

  return (
    <>
      <nav className="sticky top-0 backdrop-blur-xl">
        <Header
          label={fetchUser?.name}
          showBackArrow
          isFollowPage
          labelUsername={fetchUser?.username}
        />
        <div className="text-white">
          <div>
            <div className="flex items-center w-full justify-between text-neutral-500 border-b border-neutral-800">
              <div
                className={`cursor-pointer flex items-center justify-center w-1/2 p-4 hover:bg-neutral-800 hover:bg-opacity-70 ease-in-out duration-300 ${
                  router.asPath.includes("following")
                    ? "text-white font-bold bg-neutral-800 bg-opacity-70"
                    : null
                }`}
                onClick={() => router.push(`/users/${username}/following`)}
              >
                <div>
                  <h3 className="text-base">Following</h3>
                  {router.asPath.includes("following") && (
                    <div
                      className="absolute bottom-0 w-20 h-1 bg-blue-500"
                      style={{ borderRadius: "4px" }}
                    />
                  )}
                </div>
              </div>
              <div
                className={`cursor-pointer flex items-center justify-center w-1/2 p-4 hover:bg-neutral-800 hover:bg-opacity-70 ease-in-out duration-300 ${
                  router.asPath.includes("followers")
                    ? "text-white font-bold bg-neutral-800 bg-opacity-70"
                    : null
                }`}
                onClick={() => router.push(`/users/${username}/followers`)}
              >
                <h3 className="text-base relative">Followers</h3>
                {router.asPath.includes("followers") && (
                  <div
                    className="absolute bottom-0 w-20 h-1 bg-blue-500"
                    style={{ borderRadius: "4px" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default FollowPage;
