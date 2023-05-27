import { ISidebarType } from "@/types/sidebar.type";
import { signOut } from "next-auth/react";
import { CiCircleMore } from "react-icons/ci";
import {
  RiBookmarkLine,
  RiHashtag,
  RiHome7Fill,
  RiLogoutBoxLine,
  RiMailLine,
  RiNotification3Line,
  RiSearchLine,
  RiUserLine,
} from "react-icons/ri";

const SidebarItems: ISidebarType[] = [
  {
    label: "Home",
    href: "/",
    icon: RiHome7Fill,
    public: true,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: RiHashtag,
    secondaryIcon: RiSearchLine,
    public: true,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: RiNotification3Line,
    public: false,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: RiMailLine,
    public: false,
  },
  {
    label: "Bookmarks",
    href: "/bookmarks",
    icon: RiBookmarkLine,
    public: false,
  },
  {
    label: "Profile",
    href: "/users/",
    icon: RiUserLine,
    public: false,
  },
  {
    label: "Logout",
    href: "/logout",
    icon: RiLogoutBoxLine,
    public: false,
    onClick: signOut,
  },
  {
    label: "More",
    href: "/more",
    icon: CiCircleMore,
    public: true,
  },
];

export { SidebarItems };
