import { FC, useCallback } from "react";
import { useRouter } from "next/router";

import useWindowSize from "@/hooks/useWindowSize";
import { ISidebarType } from "@/types/sidebar.type";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarItem: FC<ISidebarType> = ({
  href,
  onClick,
  label,
  icon: Icon,
  secondaryIcon: SecondaryIcon,
  public: isPublic,
}) => {
  const { width } = useWindowSize();
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const handleSidebarItemClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (isPublic && !currentUser?.email) {
      return loginModal.onOpen();
    } else if (href) {
      let redirectUrl = href;
      if (label.localeCompare("Profile") == 0) {
        redirectUrl = href + currentUser?.username;
      }
      router.push(redirectUrl);
    }
  }, [
    href,
    onClick,
    router,
    loginModal,
    isPublic,
    currentUser?.email,
    label,
    currentUser?.username,
  ]);

  const RenderIcon = useCallback(() => {
    return width! < 1024 ? (
      SecondaryIcon ? (
        <SecondaryIcon size={28} color="#fff" />
      ) : (
        <Icon size={28} color="#fff" />
      )
    ) : (
      <Icon size={28} color="#fff" />
    );
  }, [width, SecondaryIcon, Icon]);

  return (
    <div
      className="flex items-center flex-row"
      onClick={handleSidebarItemClick}
    >
      <div className="relative rounded-full h-14 w-14 p-4 flex items-center justify-center cursor-pointer hover:bg-neutral-800 hover:bg-opacity-70 transition lg:hidden">
        <RenderIcon />
      </div>
      <div className="relative hidden lg:flex items-center rounded-full cursor-pointer hover:bg-neutral-800 hover:bg-opacity-70 gap-4 p-4">
        <Icon size={28} color="#fff" />
        <span className="text-white text-lg hidden lg:block">{label}</span>
      </div>
    </div>
  );
};

export default SidebarItem;
