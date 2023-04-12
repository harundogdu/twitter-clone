import ColorUtils from "@/base/colors";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Button from "@/components/shared/Button";
import BottomTitle from "./BottomTitle";
import { useCallback } from "react";

const Bottom = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const handleLoginClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  const handleRegisterClick = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  return (
    <div className="absolute bottom-0 w-full">
      <div
        className="w-full p-2"
        style={{
          backgroundColor: ColorUtils.colors.main,
        }}
      >
        <div className="flex justify-between w-full mx-auto max-w-6xl">
          <div className="flex-[.4]" />
          <div className="flex flex-col flex-1">
            <BottomTitle text="Don’t miss what’s happening" size="lg" />
            <BottomTitle
              text="People on Twitter are the first to know."
              size="sm"
              weight="medium"
            />
          </div>
          <div className="flex space-x-3">
            <div className="py-2">
              <Button
                label="Log in"
                onClick={handleLoginClick}
                style={{
                  padding: "0.5rem 1rem",
                  border: "1px solid rgba(255, 255, 255, 0.35)",
                  color: ColorUtils.colors.white,
                }}
              />
            </div>
            <div className="py-2">
              <Button
                label="Sign up"
                onClick={handleRegisterClick}
                style={{
                  padding: "0.5rem 1rem",
                  background: ColorUtils.colors.white,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
