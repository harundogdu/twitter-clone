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
                size="custom"
                onClick={handleLoginClick}
                border="sm"
                borderColor="white"
                labelWeight="semibold"
                labelSize="base"
              />
            </div>
            <div className="py-2">
              <Button
                label="Sign up"
                size="custom"
                onClick={handleRegisterClick}
                secondary
                labelSize="base"
                labelWeight="semibold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
