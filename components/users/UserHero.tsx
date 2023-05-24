import React, { FC, useState } from "react";

import Portal from "@/components/shared/Portal";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import Avatar from "../Avatar";
import { set } from "date-fns";
import { RiCloseFill } from "react-icons/ri";
import ColorUtils from "@/base/colors";

interface IUserHeroProps {
  userId: string;
}

const UserHero: FC<IUserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  const [modal, setModal] = useState(false);
  const [cover, setCover] = useState(false);

  const viewImage = (type: string) => {
    type === "cover" ? setCover(true) : setCover(false);
    document.getElementById("layout")?.classList.add("overflow-hidden");
    setModal(true);
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
          <div className="bg-opacity-80 bg-black w-full h-full flex absolute justify-center items-center inset-x-0 inset-y-0 z-30 ">
            <img
              src={cover ? fetchedUser?.coverImage : fetchedUser?.profileImage}
              alt="Cover image"
              className={
                cover
                  ? " h-3/4 w-full  opacity-100  object-cover z-50 "
                  : " h-96 w-96  opacity-100  object-cover z-50 rounded-full overflow-hidden"
              }
            />
          </div>
        </Portal>
      )}

      <div className="bg-neutral-700 h-52 relative w-full ">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser?.coverImage}
            fill
            alt="Cover image"
            style={{ objectFit: "cover" }}
            onClick={() => viewImage("cover")}
          />
        )}
        <div className="absolute -bottom-10 left-6">
          <Avatar
            userId={fetchedUser?.id}
            size="large"
            hasBorder
            //@ts-ignore
            onClick={viewImage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
