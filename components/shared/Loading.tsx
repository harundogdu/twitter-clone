import ColorUtils from "@/base/colors";
import { RiLoader5Line } from "react-icons/ri";

const Loading = () => {
  return (
    <div
      className="
            flex 
            items-center 
            justify-center
            p-4
            fixed
            inset-0
            z-50
            outline-none
            focus:outline-none
            bg-opacity-70
            bg-neutral-700
    "
      style={{
        backgroundColor: ColorUtils.colors.purple,
      }}
    >
      <RiLoader5Line
        className="
            animate-spin
            text-6xl
            "
      />
    </div>
  );
};

export default Loading;
