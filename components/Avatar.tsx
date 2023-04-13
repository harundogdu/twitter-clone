import Image from "next/image";
import React, { FC } from "react";

interface AvatarProps {
  profileImage: string;
}

const Avatar: FC<AvatarProps> = ({ profileImage }) => {
  return (
    <>
      <Image
        src={profileImage || "/default_doge_coin.png"}
        alt="user profile image"
        width={44}
        height={44}
        className="rounded-full"
      />
    </>
  );
};

export default Avatar;
