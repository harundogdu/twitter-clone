import React from "react";

interface BottomTitleProps {
  text: string;
  size?: "sm" | "md" | "lg";
  weight?: "light" | "medium" | "bold";
}

const BottomTitle: React.FC<BottomTitleProps> = ({
  text,
  size = "md",
  weight = "medium",
}) => {
  return (
    <p
      className={`text-white  ${
        (size === "lg" && "text-2xl") ||
        (size === "sm" && "text-sm") ||
        (size === "md" && "text-base")
      } ${
        (weight === "light" && "font-light") ||
        (weight === "medium" && "font-medium") ||
        (weight === "bold" && "font-bold")
      }`}
    >
      {text}
    </p>
  );
};

export default BottomTitle;
