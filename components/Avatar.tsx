import React, { FC, useCallback } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import useUser from "@/hooks/useUser";

interface AvatarProps {
  username: string;
  size?: "small" | "medium" | "large";
  hasBorder?: boolean;
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

const Avatar: FC<AvatarProps> = ({
  username,
  size = "medium",
  hasBorder = false,
  onClick,
}) => {
  const router = useRouter();
  const { data: fetchedUser } = useUser(username);

  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      const response = await fetch(`/api/users/${username}`);
      const data = await response.json();

      const _username: string = data.username;

      const url = `/users/${_username}`;
      router.push(url);
    },
    [router, username]
  );

  return (
    <div onClick={onClick ? onClick : handleClick}>
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
