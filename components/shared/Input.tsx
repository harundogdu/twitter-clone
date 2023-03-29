import React, {FC, HTMLInputTypeAttribute} from "react";

interface InputProps {
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = (
    {
        type,
        placeholder = "",
        disabled = false,
        value = "",
        onChange = () => {},
    }
) => {
    return (
        <>
            <input
                type={type}
                className="border border-gray-800 rounded-sm p-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-transparent text-white"
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                onChange={onChange}
            />
        </>
    );
};

export default Input;