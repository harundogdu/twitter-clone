import {FaTwitter} from "react-icons/fa";
import {useRouter} from "next/router";

const SidebarLogo = () => {
    const router = useRouter();
    const handleOnClick = () => {
        router.push("/");
    };
    return (
        <div className="
        text-gray-300
        hover:text-white
        transition
        duration-200
        cursor-pointer
        px-4
        pb-4
        "
             onClick={handleOnClick}
        >
            <FaTwitter size={28}/>
        </div>
    );
};

export default SidebarLogo;