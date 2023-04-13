import React, { FC, useCallback } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import useUser from "@/hooks/useUser";

interface AvatarProps {
  userId: string;
}

const Avatar: FC<AvatarProps> = ({ userId }) => {
  const router = useRouter();
  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      event.stopPropagation();

      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );

  return (
    <div onClick={onClick}>
      <Image
        src={fetchedUser?.profileImage || "/default_doge_coin.png"}
        alt="user profile image"
        width={44}
        height={44}
        className="rounded-full"
      />
    </div>
  );
};

export default Avatar;
