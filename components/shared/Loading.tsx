import { RiLoader5Line } from "react-icons/ri";

import ColorUtils from "@/base/colors";

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
        color: ColorUtils.colors.main,
      }}
    >
      <RiLoader5Line
        className="
            animate-spin
            text-6xl
            rounded-full
            "
        style={{
          backgroundColor: ColorUtils.colors.darkGray,
        }}
      />
    </div>
  );
};

export default Loading;
