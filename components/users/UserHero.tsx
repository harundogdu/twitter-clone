import React, { FC } from "react";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import Avatar from "../Avatar";

interface IUserHeroProps {
  userId: string;
}

const UserHero: FC<IUserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);
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
          <Avatar userId={fetchedUser?.id} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
