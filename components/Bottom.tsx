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
      <span className="mr-2">Dont miss whats going on</span>
    </p>
  );

  const bodycontent = (
    <p className="text-white">
      <span className="mr-2">Twitter users will be the first to know..</span>
    </p>
  );

  return (
    <>
      <div className="flex justify-between sticky overflow-x-hidden overflow-y-auto  inset-0 z-0 outline-none focus:outline-none  bottom-0">
        <div className="flex justify-between  h-full w-full  lg:h-auto">
          <div
            className=" flex px-8 justify-between h-full w-full   grid-row-3"
            style={{
              backgroundColor: ColorUtils.colors.purple,
            }}
          >
            <div className=" flex items-center mx-8 p-2 pt-2 grid ">
              <div className="text-2xl font-semibold text-white">
                {bodytittle}
              </div>
              <div className="flex   ">{bodycontent}</div>
            </div>

            <div className="mx-8 flex p-4">
              <div>
                <div className="flex items-center justify-end">
                  {/*Button*/}
                  <div className="flex flex-col gap-4 p-4  ">
                    <Button
                      label={"login"}
                      disabled={disabled}
                      secondary
                      large
                      onClick={handleLoginClick}
                    />
                  </div>
                  <div className="flex flex-col gap-4 p-4 ">
                    <Button
                      label={"register"}
                      disabled={disabled}
                      secondary
                      large
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
