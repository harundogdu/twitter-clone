import React, { FC, HTMLInputTypeAttribute, useState } from "react";

import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

import {
  validateEmail,
  isNullOrEmpty,
  isNullOrUndefined,
} from "@/utils/helpers";
import ColorUtils from "@/base/colors";

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
    let borderColor: string = "focus:ring-transparent "; //!

    if (isNullOrEmpty(value) && isNullOrUndefined(value)) {
      borderColor = "focus:ring-red-600 border-gray-800";
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
    <div className="relative group">
      <input
        type={renderType}
        placeholder=" "
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={`border border-gray-800 rounded-sm p-4 w-full focus:outline-none focus:ring-1 ${inputControl(
          type,
          value
        )} focus:border-transparent bg-transparent text-white peer`}
      />

      <label
        className="absolute  left-[9px] top-px text-gray-500 transition-all duration-300 px-1 transform -translate-y-1/2 pointer-events-none 
      peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base group-focus-within:!top-px group-focus-within:!text-sm focus:text-blue-500"
      >
        {placeholder}
      </label>

      <fieldset
        className="inset-0 absolute border border-gray-800  rounded pointer-events-none mt-[-9px] invisible peer-placeholder-shown:visible 
group-focus-within:!border-blue-500 group-focus-within:border-2"
      >
        <legend className="ml-2 px-0 text-sm transition-all duration-300 invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-1 whitespace-nowrap">
          {placeholder}
        </legend>
      </fieldset>

      <fieldset className="inset-0 absolute border border-gray-800 rounded pointer-events-none mt-[-9px] visible peer-placeholder-shown:invisible  group-focus-within:border-2 group-focus-within:!border-blue-500 group-hover:border-gray-700">
        <legend className="ml-2 text-sm invisible px-1 max-w-full whitespace-nowrap">
          {placeholder}
        </legend>
      </fieldset>
      {value &&
      !validateEmail(value) &&
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
