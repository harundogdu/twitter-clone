import Email from "next-auth/providers/email";
import React, { FC, HTMLInputTypeAttribute, useState } from "react";

import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

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

  const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const inputControl = (type: string, value: string): string => {
    let borderColor: string = "focus:ring-primary-main ";

    if (type === "email" && value !== "") {
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
        )} focus:border-transparent bg-transparent   text-white`}
      />
      {!validateEmail(value) && type === "email" && value !== "" ? (
        <div className="text-red-600">Please enter a valid {type}.</div>
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
