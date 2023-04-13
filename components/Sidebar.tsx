import { useCallback } from "react";
import Image from "next/image";

import { RiMoreFill } from "react-icons/ri";

import ColorUtils from "@/base/colors";
import SpaceUtils from "@/base/spaces";

import useLoginModal from "@/hooks/useLoginModal";
import useWindowSize from "@/hooks/useWindowSize";
import useCurrentUser from "@/hooks/useCurrentUser";

import SidebarLogo from "@/components/SidebarLogo";
import SidebarItem from "@/components/SidebarItem";
import Button from "@/components/shared/Button";

import { SidebarItems } from "@/utils/@fake.db";

const Sidebar = () => {
  const { onOpen } = useLoginModal();
  const { data } = useCurrentUser();

  const handleShareClick = useCallback(() => {
    if (!data?.currentUser?.email) {
      return onOpen();
    }

    // TODO:: Share Popup
  }, [data, onOpen]);

  const RenderSidebarItems = useCallback(() => {
    const sideBarItems = data?.currentUser?.email
      ? [...SidebarItems]
      : [...SidebarItems].filter((item) => item.public);
    return (
      <div className="space-y-1">
        {sideBarItems.map((item, index) => (
          <SidebarItem
            label={item.label}
            icon={item.icon}
            secondaryIcon={item.secondaryIcon}
            href={item.href}
            onClick={item.onClick}
            key={index}
          />
        ))}
      </div>
    );
  }, [data]);
  return (
    <div className="mt-[0.875rem] px-1 h-full col-span-1 sm:px-4 md:px-6 flex items-start justify-center">
      <div className="flex flex-col items-center md:items-start h-full">
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-2.5 lg:w-[230px] self-center">
            <SidebarLogo />
            <RenderSidebarItems />
            <Button
              label="Share"
              fullWidth
              size="md"
              bgColor={ColorUtils.colors.main}
              color={ColorUtils.colors.white}
              marginVertical={SpaceUtils.spaces.lg}
              showShareButton
              onClick={handleShareClick}
            />
          </div>
          {data && (
            <div className="flex gap-5 items-center justify-center rounded-full cursor-pointer hover:bg-neutral-800 hover:bg-opacity-70 mb-10 transition-colors p-2">
              <div>
                <Image
                  src={
                    data?.currentUser?.profileImage || "/default_doge_coin.png"
                  }
                  alt={"avatar"}
                  width={32}
                  height={32}
                  className="rounded-full h-8 w-8 object-contain object-center bg-white"
                />
              </div>
              <>
                <div className="flex flex-col items-start justify-center">
                  <div className="text-white font-bold text-sm text-ellipsis whitespace-nowrap max-w-full w-full overflow-hidden">
                    {data?.currentUser?.name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    @{data?.currentUser?.username}
                  </div>
                </div>
                <div>
                  <RiMoreFill size={24} color="#fff" />
                </div>
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
