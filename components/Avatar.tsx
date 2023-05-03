import React, { FC, useCallback } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import useUser from "@/hooks/useUser";

interface AvatarProps {
  userId: string;
  size?: "small" | "medium" | "large";
  hasBorder?: boolean;
}

const Avatar: FC<AvatarProps> = ({
  userId,
  size = "medium",
  hasBorder = false,
}) => {
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
        alt={`${fetchedUser?.name} profile image`}
        src={fetchedUser?.profileImage || "/default_doge_coin.png"}
        width={size === "large" ? 128 : size === "medium" ? 64 : 42}
        height={size === "large" ? 128 : size === "medium" ? 64 : 42}
        className={`
        bg-white
        rounded-full
        ${hasBorder ? "border-neutral-900 border-4 rounded-full" : ""}
        `}
      />
    </div>
  );
};

export default Avatar;
