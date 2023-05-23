import React, { FC } from "react";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import Avatar from "../Avatar";

interface IUserHeroProps {
  username: string;
}

const UserHero: FC<IUserHeroProps> = ({ username }) => {
  const { data: fetchedUser } = useUser(username);
  return (
    <div>
      <div className="bg-neutral-700 h-52 relative w-full">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser?.coverImage}
            fill
            alt="Cover image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-10 left-6">
          <Avatar username={username} size="large" hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
