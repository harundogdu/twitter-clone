import {ISidebarType} from "@/types/sidebar.type";
import {
    RiBookmarkLine,
    RiHashtag,
    RiHome7Fill,
    RiMailLine,
    RiNotification3Line,
    RiSearchLine,
    RiUserLine
} from "react-icons/ri";
import {CiCircleMore} from "react-icons/ci";

const SidebarItems: ISidebarType[] = [
    {
        label: "Home",
        href: "/",
        icon: RiHome7Fill,
    },
    {
        label: "Explore",
        href: "/explore",
        icon: RiHashtag,
        secondaryIcon: RiSearchLine,
    },
    {
        label: "Notifications",
        href: "/notifications",
        icon: RiNotification3Line,
    },
    {
        label: "Messages",
        href: "/messages",
        icon: RiMailLine,
    },
    {
        label: "Bookmarks",
        href: "/bookmarks",
        icon: RiBookmarkLine,
    },
    {
        label: "Profile",
        href: "/profile/hd",
        icon: RiUserLine,
    },
    {
        label: "More",
        href: "/more",
        icon: CiCircleMore,
    }
];

export {
    SidebarItems
};