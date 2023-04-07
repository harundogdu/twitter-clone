import React, { FC } from "react";

import ColorUtils from "@/base/colors";

import Button from "@/components/shared/Button";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

interface IModalProps {
  disabled?: boolean;
}
const Bottom: FC<IModalProps> = ({ disabled = false }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const handleLoginClick = () => {
    loginModal.onOpen();
  };

  const handleRegisterClick = () => {
    registerModal.onOpen();
  };

  const bodytittle = (
    <p className="text-white">
      <span className="mr-2 font-bold">Don’t miss what’s happening</span>
    </p>
  );

  const bodycontent = (
    <p className="text-white">
      <span className="mr-2 font-bold">
        People on Twitter are the first to know.
      </span>
    </p>
  );

  return (
    <>
      <div className="flex  sticky overflow-x-hidden overflow-y-auto  inset-0 z-0 outline-none focus:outline-none  bottom-0 shadow-[0_0px_9px_0px_rgba(255,255,255,0.6)]  ">
        <div className="flex justify-center item-center  h-full w-full  lg:h-auto ">
          <div
            className=" flex px-8 justify-evenly h-full w-full p-3 "
            style={{
              backgroundColor: ColorUtils.colors.purple,
            }}
          >
            <div className=" flex justify-between grid">
              <div className="text-2xl font-semibold text-white">
                {bodytittle}
              </div>
              <div className="flex   ">{bodycontent}</div>
            </div>

            <div className="flex ">
              <div className="flex items-center justify-end">
                <div className="flex items-center grid-col-2">
                  {/*Button*/}
                  <div className="flex flex-col p-2 font-bold">
                    <Button
                      label="Log in"
                      size="lg"
                      border="2"
                      borderColor={ColorUtils.colors.white}
                      bgColor={ColorUtils.colors.purple}
                      color={ColorUtils.colors.white}
                      onClick={handleLoginClick}
                    />
                  </div>
                  <div className="flex flex-col p-2 font-bold">
                    <Button
                      label="Sign up"
                      border="border-2 "
                      borderColor="border-rose-500"
                      size="lg"
                      bgColor={ColorUtils.colors.white}
                      color={ColorUtils.colors.black}
                      onClick={handleRegisterClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bottom;
