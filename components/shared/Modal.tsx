import React, { FC, useCallback, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";
import Button from "@/components/shared/Button";

interface IModalProps {
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: FC<IModalProps> = ({
  isOpen,
  children,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled = false,
}) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter" && disabled === false) {
      onSubmit();
    }
  };

  return (
    <>
      <div
        className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all duration-300 bg-neutral-700 bg-opacity-70"
        onKeyDown={handleKeyDown}
      >
        <div className="relative my-6 h-full w-full lg:w-[500px] lg:h-auto">
          {/*content*/}
          <div className="rounded-lg border-0 bg-black flex flex-col h-full shadow-lg outline-none focus:outline-none relative w-full">
            {/*header*/}
            <div className="flex justify-between items-center p-8 rounded-t">
              <h5 className="text-3xl font-semibold text-white">{title}</h5>
              <button
                onClick={handleClose}
                className="p-1 border-0 hover:opacity-70 transition"
              >
                <RiCloseFill size={28} color={"#fff"} />
              </button>
            </div>
            {/*body*/}
            <div className="relative px-8 py-4 flex-auto">{body}</div>
            {/*footer*/}
            <div className="flex flex-col gap-4 p-8 items-center justify-center ">
              <Button
                label={actionLabel}
                disabled={disabled}
                secondary
                fullWidth
                labelSize="lg"
                labelWeight="semibold"
                onClick={handleSubmit}
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
