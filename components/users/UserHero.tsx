import React, { FC, useState } from "react";
import Image from "next/image";

import { RiCloseFill } from "react-icons/ri";

import ColorUtils from "@/base/colors";

import useUser from "@/hooks/useUser";

import Avatar from "../Avatar";
import Portal from "@/components/shared/Portal";

interface IUserHeroProps {
  username: string;
}

const UserHero: FC<IUserHeroProps> = ({ username }) => {
  const { data: fetchedUser } = useUser(username);
  const [modal, setModal] = useState(false);
  const [cover, setCover] = useState(false);

  const viewImage = (type: string) => {
    type === "cover" ? setCover(true) : setCover(false);
    document.getElementById("layout")?.classList.add("overflow-hidden");
    setModal(true);
  };

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const attributeValue = target.getAttribute("image-data");
    if (attributeValue === "image") return;
    setModal(false);
    document.getElementById("layout")?.classList.remove("overflow-hidden");
  };

  return (
    <div>
      {modal && (
        <Portal>
          <RiCloseFill
            style={{ color: ColorUtils.colors.white }}
            className="w-6 h-6 fixed top-5 left-5 cursor-pointer z-50"
            onClick={() => {
              setModal(false);
              document
                .getElementById("layout")
                ?.classList.remove("overflow-hidden");
            }}
          />
          <div
            className="bg-opacity-90 bg-black w-full h-full flex absolute justify-center items-center inset-x-0 inset-y-0 z-30 "
            onClick={(e) => closeModal(e)}
          >
            <img
              src={
                (cover ? fetchedUser?.coverImage : fetchedUser?.profileImage) ??
                "/twitter-user-avatar.jpg"
              }
              alt="Cover image"
              className={
                cover
                  ? " h-3/4 w-full  opacity-100  object-cover z-50  "
                  : " h-96 w-96  opacity-100  object-cover z-50 rounded-full overflow-hidden"
              }
              image-data="image"
            />
          </div>
        </Portal>
      )}

      <div className="bg-neutral-700 h-52 relative w-full cursor-pointer">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser?.coverImage}
            fill
            alt="Cover image"
            style={{ objectFit: "cover" }}
            onClick={() => viewImage("cover")}
          />
        )}
        <div className="absolute -bottom-10 left-6 cursor-pointer ">
          <div
            className="absolute w-32 h-32  rounded-full hover:bg-black hover:opacity-10"
            onClick={() => viewImage("profile")}
          />
          <Avatar username={username} size="large" hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
