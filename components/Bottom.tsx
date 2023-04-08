import React, { FC } from "react";

import ColorUtils from "@/base/colors";

import Button from "@/components/shared/Button";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useBottomBar from "@/hooks/useBottomBar";

const Bottom = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const bottomModal = useBottomBar();

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
        <div className="flex h-full w-full  justify-center items-center ">
          <div
            className=" flex  h-full w-full p-1 grid justify-items-stretch "
            style={{
              backgroundColor: ColorUtils.colors.purple,
            }}
          >
            <div className="flex justify-center ml-10 ">
              <div className=" flex grid ">
                <div className="text-2xl font-semibold text-white">
                  {bodytittle}
                </div>
                <div className="flex">{bodycontent}</div>
              </div>

              <div className="flex p ">
                <div className="flex items-center justify-end">
                  <div className="flex items-center grid-col-2">
                    {/*Button*/}
                    <div className="flex flex-col p-2 font-bold ">
                      <Button
                        label="Log in"
                        size="lg"
                        border="2"
                        onClick={handleLoginClick}
                        style={{
                          padding: "12px",
                          color: ColorUtils.colors.white,
                        }}
                      />
                    </div>

                    <div className="flex flex-col p-2 font-bold  ">
                      <Button
                        label="Sign up"
                        border="border-2 "
                        borderColor="border-rose-500"
                        size="lg"
                        onClick={handleRegisterClick}
                        style={{
                          padding: "12px",
                          background: ColorUtils.colors.white,
                        }}
                      />
                    </div>
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
