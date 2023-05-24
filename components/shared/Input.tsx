import React, { FC, HTMLInputTypeAttribute, useState } from "react";

import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

import { validateEmail } from "@/utils/helpers";
import ColorUtils from "@/base/colors";

import { isNullOrUndefined, isNullOrEmpty } from "../../utils";
interface InputProps {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  type,
  placeholder = "",
  disabled = false,
  value = "",
  onChange = () => {},
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(false);

  const onPasswordChangeVisibility = () => {
    setTimeout(() => {
      setIsPasswordHidden((current) => !current);
    }, 200);
  };

  const placeholderText = "Email or Username";

  const inputControl = (type: string, value: string): string => {
    let borderColor: string = "focus:ring-primary-main ";

    if (isNullOrUndefined(value) || isNullOrEmpty(value)) {
      borderColor = "focus:ring-red-600 border-violet-600";
      return borderColor;
    }

    if (
      type === "text" &&
      value !== "" &&
      value.includes("@") &&
      placeholder === placeholderText
    ) {
      // for log in
      if (!validateEmail(value)) {
        borderColor = "focus:ring-red-600 border-red-600";
      }
    }

    if (type === "email" && value !== "") {
      // for register
      if (!validateEmail(value)) {
        borderColor = "focus:ring-red-600 border-red-600";
      }
    }

    return borderColor;
  };

  const renderType =
    type === "password" ? (isPasswordHidden ? "text" : "password") : type;

  return (
    <div className="relative">
      <input
        type={renderType}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={`border border-gray-800 rounded-sm p-4 w-full focus:outline-none focus:ring-1 ${inputControl(
          type,
          value
        )} focus:border-transparent bg-transparent text-white`}
      />
      {!validateEmail(value) &&
      type === "text" &&
      value !== "" &&
      value.includes("@") &&
      placeholder === placeholderText ? (
        <div
          style={{
            color: ColorUtils.colors.red,
          }}
        >
          Please enter a valid email.
        </div>
      ) : null}
      {!validateEmail(value) && type === "email" && value !== "" ? (
        <div
          style={{
            color: ColorUtils.colors.red,
          }}
        >
          Please enter a valid email.
        </div>
      ) : null}
      {type === "password" ? (
        <span
          onClick={onPasswordChangeVisibility}
          className="text-white absolute top-1/2 right-4 -translate-y-1/2 select-none cursor-pointer "
        >
          {isPasswordHidden ? (
            <RiEyeOffLine className="duration-200 hover:scale-110  " />
          ) : (
            <RiEyeLine className="  duration-200 hover:scale-110 " />
          )}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
