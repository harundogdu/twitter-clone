import React, {
  FC,
  HTMLInputTypeAttribute,
  useCallback,
  useMemo,
  useState,
} from "react";

import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

import {
  isNullOrEmpty,
  isNullOrUndefined,
  validateEmail,
} from "@/utils/helpers";

interface InputProps {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  multiline?: boolean;
  rows?: number;
}

const Input: FC<InputProps> = ({
  type,
  placeholder = "",
  disabled = false,
  value = "",
  onChange = () => {},
  multiline = false,
  rows = 3,
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(false);

  const onPasswordChangeVisibility = () => {
    setTimeout(() => {
      setIsPasswordHidden((current) => !current);
    }, 200);
  };

  const placeholderText = "Email or Username";

  const inputControl = useCallback(
    (type: string, value: string): string => {
      let borderColor: string = "focus:ring-transparent ";

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
    },
    [placeholder]
  );

  const renderType =
    type === "password" ? (isPasswordHidden ? "text" : "password") : type;

  const errorControl = useMemo(() => {
    return (
      value &&
      !validateEmail(value) &&
      type === "text" &&
      value !== "" &&
      value.includes("@") &&
      placeholder === placeholderText
    );
  }, [value, type, placeholder]);

  return (
    <div className="relative">
      {!multiline ? (
        <div className="relative">
          <input
            id="floating_filled"
            className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-main focus:outline-none focus:ring-0 focus:border-primary-main peer rounded-lg 
          ${errorControl ? "!border-red-600" : ""}
          ${inputControl(type, value)}
          ${
            disabled
              ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-500 dark:text-gray-400"
              : ""
          }
          `}
            placeholder=" "
            type={renderType}
            disabled={disabled}
            value={value}
            onChange={onChange}
            autoComplete="off"
          />
          <label
            htmlFor="floating_filled"
            className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
              errorControl ? "!text-red-600" : ""
            }`}
          >
            {placeholder}
          </label>
        </div>
      ) : (
        <div className="relative">
          <textarea
            rows={rows}
            className={`block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-main focus:outline-none focus:ring-0 focus:border-primary-main peer
          ${errorControl ? "border-red-600" : ""}
          ${disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : ""}
          `}
            placeholder=" "
            disabled={disabled}
            onChange={onChange}
            defaultValue={value}
          />
          <label
            htmlFor="floating_filled"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            {placeholder}
          </label>
        </div>
      )}
      {errorControl ? (
        <div className="text-custom-externalRed text-xs mt-1 pl-1">
          Please enter a valid email.
        </div>
      ) : null}
      {!validateEmail(value) && type === "email" && value !== "" ? (
        <div className="text-custom-externalRed text-xs mt-1 pl-1">
          Please enter a valid email.
        </div>
      ) : null}
      {type === "password" ? (
        <span
          onClick={onPasswordChangeVisibility}
          className="text-white absolute top-1/2 right-4 -translate-y-1/2 select-none cursor-pointer"
        >
          {isPasswordHidden ? (
            <RiEyeOffLine className="duration-200 hover:scale-110" />
          ) : (
            <RiEyeLine className="duration-200 hover:scale-110" />
          )}
        </span>
      ) : null}
    </div>
  );
};

export default React.memo(Input);
