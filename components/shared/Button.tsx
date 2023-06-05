import React, { FC, useState } from "react";

import { IconType } from "react-icons";

import ButtonUtils from "@/base/button";
import useWindowSize from "@/hooks/useWindowSize";

interface IButtonProps {
  label: string;
  secondary?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  marginHorizontal?: string;
  marginVertical?: string;
  paddingVertical?: string;
  paddingHorizontal?: string;
  hoverBgColor?: string;
  hoverBorderColor?: string;
  hoverColor?: string;
  bgColor?: string;
  color?: string;
  icon?: IconType;
  showShareButton?: boolean;
  disabled?: boolean;
  border?: string;
  borderColor?: string;
  style?: React.CSSProperties | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  labelWeight?:
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold";
  hoverEnabled?: boolean;
  labelSize?: "xs" | "sm" | "base" | "lg";
  hoverText?: string;
  large?: boolean;
  btnBlack?: boolean;
}

const Button: FC<IButtonProps> = ({
  label,
  secondary = false,
  btnBlack = false,
  onClick,
  fullWidth = false,
  size = "md",
  bgColor = null,
  color = null,
  icon: Icon,
  showShareButton = false,
  disabled,
  border = null,
  borderColor = null,
  type,
  labelWeight = null,
  hoverEnabled,
  labelSize,
  hoverText,
  marginHorizontal = 0,
  marginVertical = 0,
  paddingHorizontal = null,
  paddingVertical = null,
  hoverBgColor = null,
  hoverBorderColor = null,
  hoverColor = null,
}) => {
  const { width } = useWindowSize();
  const [hover, setHover] = useState(false);

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      type={type}
      className={`
                ${fullWidth ? "w-full" : "w-fit"}
                rounded-3xl
                ${
                  secondary
                    ? "bg-custom-white text-custom-black"
                    : "bg-primary-main text-custom-white"
                }

                ${
                  btnBlack &&
                  "bg-custom-black text-custom-white !border-sm  hover:!bg-opacity-10"
                }
                
                
                ${
                  (size === "xs" && "px-4 py-2 text-xs") ||
                  (size === "sm" && "px-5 py-1.5 text-sm") ||
                  (size === "md" && "px-8 py-2 text-base") ||
                  (size === "lg" && "px-8 py-3 text-lg")
                }


                !bg-${bgColor}

                font-${labelWeight}
                text-${labelWeight}
                !text-${color}

                transition-colors
                cursor-pointer

                !border-${border}
                !border-${borderColor}

                hover:!${hoverBgColor} 
                hover:!${hoverBorderColor} 
                hover:!${hoverColor}
                hover:bg-opacity-80

                !py-${paddingVertical}
                !px-${paddingHorizontal}

                !my-${marginVertical}
                !mx-${marginHorizontal}

                outline-none
                active:outline-none
                
                ${disabled && "disabled:cursor-not-allowed opacity-60"}
                ${
                  disabled &&
                  secondary &&
                  "disabled:bg-gray-300 disabled:text-gray-500"
                }
                
              
                ${
                  hoverEnabled &&
                  `hover:!${hoverBgColor} hover:!${hoverBorderColor} hover:!${hoverColor}`
                }
            `}
    >
      {Icon && <Icon className="mr-2" />}
      {width! <= 1024 && showShareButton && (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="fill-white w-6 h-6"
        >
          <g>
            <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
          </g>
        </svg>
      )}
      {width! > 1024 && (
        <span
          className={`${
            size === "lg" &&
            "text-lg transition duration-300 ease-in-out font-medium"
          } ${labelSize && `text-${labelSize}`}`}
        >
          {hover && hoverEnabled ? hoverText : label}
        </span>
      )}
    </button>
  );
};

export default Button;
