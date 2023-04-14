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
    setIsPasswordHidden((current) => !current);
  };

  const renderType =
    type === "password" ? (isPasswordHidden ? "text" : "password") : type;

  return (
    <div className="relative">
      <input
        type={renderType}
        className={`border border-gray-800 rounded-sm p-4 w-full focus:outline-none focus:ring-1 focus:ring-primary-main focus:border-transparent bg-transparent text-white`}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      {type === "password" ? (
        <span
          onClick={onPasswordChangeVisibility}
          className="text-primary-main absolute top-1/2 right-4 -translate-y-1/2 select-none cursor-pointer "
        >
          {isPasswordHidden ? <RiEyeOffLine /> : <RiEyeLine />}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
