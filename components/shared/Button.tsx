import React, { FC, useState } from "react";

import { IconType } from "react-icons";

import ButtonUtils from "@/base/button";
import useWindowSize from "@/hooks/useWindowSize";

interface IButtonProps {
  label: string;
  secondary?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
  size?: "custom" | "sm" | "md" | "lg";
  marginHorizontal?: string;
  marginVertical?: string;
  paddingVertical?: string;
  paddingHorizontal?: string;
  hoverBgColor?: string;
  hoverBorderColor?: string;
  hoverTextColor?: string;
  hoverOpacity?: string;
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
  marginHorizontal = null,
  marginVertical = null,
  paddingHorizontal = null,
  paddingVertical = null,
  hoverBgColor = null,
  hoverBorderColor = null,
  hoverTextColor = null,
  hoverOpacity = null,
}) => {
  const { width } = useWindowSize();
  const [hover, setHover] = useState(false);

  const styles = [
    `
                ${fullWidth ? "w-full" : "w-fit"}
                rounded-3xl
                ${
                  secondary
                    ? ButtonUtils.styles.secondary
                    : btnBlack
                    ? `${ButtonUtils.styles.blackBtn} ${hoverOpacity}`
                    : ButtonUtils.styles.primary
                }
             
                ${
                  (size === "custom" &&
                    ButtonUtils.buttonSizes.customButtonStyle) ||
                  (size === "sm" && ButtonUtils.buttonSizes.smStyle) ||
                  (size === "md" && ButtonUtils.buttonSizes.mdStyle) ||
                  (size === "lg" && ButtonUtils.buttonSizes.lgStyle)
                }


                ${bgColor}

                font-${labelWeight}
                ${color}

                transition-colors
                cursor-pointer

                ${border}
                ${borderColor}

                hover:bg-opacity-80

                ${paddingVertical}
                ${paddingHorizontal}

                ${marginVertical}
                ${marginHorizontal}

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
                  `
                  ${hoverBgColor} 
                  ${hoverTextColor}
                  ${hoverBorderColor}
                  ${hoverOpacity}`
                }
            `,
  ].join(" ");

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      type={type}
      className={styles}
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
