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
    active: true,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: RiHashtag,
    secondaryIcon: RiSearchLine,
    public: true,
    active: false,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: RiNotification3Line,
    public: false,
    active: true,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: RiMailLine,
    public: false,
    active: false,
  },
  {
    label: "Bookmarks",
    href: "/bookmarks",
    icon: RiBookmarkLine,
    public: false,
    active: false,
  },
  {
    label: "Profile",
    href: "/users/",
    icon: RiUserLine,
    public: false,
    active: true,
  },
  {
    label: "Logout",
    href: "/logout",
    icon: RiLogoutBoxLine,
    public: false,
    onClick: signOut,
    active: true,
  },
  {
    label: "More",
    href: "/more",
    icon: CiCircleMore,
    public: true,
    active: false,
  },
];

export { SidebarItems };
