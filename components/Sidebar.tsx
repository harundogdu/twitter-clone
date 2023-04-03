import { useCallback } from "react";
import Image from "next/image";

import { RiMoreFill } from "react-icons/ri";

import ColorUtils from "@/base/colors";
import SpaceUtils from "@/base/spaces";

import useLoginModal from "@/hooks/useLoginModal";
import useWindowSize from "@/hooks/useWindowSize";
import { SidebarItems } from "@/utils/@fake.db";

import SidebarLogo from "@/components/SidebarLogo";
import SidebarItem from "@/components/SidebarItem";
import Button from "@/components/shared/Button";

const Sidebar = () => {
  const { width } = useWindowSize();
  const { onOpen } = useLoginModal();
  const RenderSidebarItems = useCallback(() => {
    return (
      <div className="space-y-1">
        {SidebarItems.map((item, index) => (
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
  }, []);
  return (
    <div className="mt-[0.875rem] px-1 h-full col-span-1 sm:px-4 md:px-6 flex items-start justify-center">
      <div className="flex flex-col items-center md:items-start h-full">
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-2.5 lg:w-[230px] self-center">
            <SidebarLogo />
            <RenderSidebarItems />
            <Button
              label={"Share"}
              fullWidth
              size={"lg"}
              bgColor={ColorUtils.colors.purple}
              color={ColorUtils.colors.white}
              marginVertical={SpaceUtils.spaces.lg}
              showShareButton
              onClick={onOpen}
            />
          </div>
          <div className="flex gap-5 items-center justify-center rounded-full cursor-pointer hover:bg-neutral-800 hover:bg-opacity-70 mb-10 transition-colors p-2">
            <div>
              <Image
                src={"https://avatars.githubusercontent.com/u/43449361?v=4"}
                alt={"avatar"}
                width={32}
                height={32}
              />
            </div>
            {width! > 1024 && (
              <>
                <div className="flex flex-col items-start justify-center">
                  <div className="text-white font-bold text-sm">
                    Harun Doğdu <span>🇹🇷</span>
                  </div>
                  <div className="text-gray-500 text-sm">@harunndogdu</div>
                </div>
                <div>
                  <RiMoreFill size={24} color="#fff" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
