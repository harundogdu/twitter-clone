import React, { useCallback, useState } from "react";

import ColorUtils from "@/base/colors";
import useLoginModal from "@/hooks/useLoginModal";

import Modal from "@/components/shared/Modal";
import Input from "@/components/shared/Input";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: Login
      loginModal.onClose();
      console.log("Login success");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [loginModal]);

  if (loading) return <div>Loading...</div>; // TODO: Loading component

  const handleFooterClick = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Input
        type={"text"}
        placeholder={"Email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type={"password"}
        placeholder={"Password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
  const footerContent = (
    <p className="text-white space-x-1">
      <span className="mr-2">Don&apos;t have an account?</span>
      <button
        className="hover:underline"
        style={{ color: ColorUtils.colors.purple }}
        onClick={handleFooterClick}
      >
        Sign up
      </button>
    </p>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit}
      title={"Login"}
      body={bodyContent}
      footer={footerContent}
      actionLabel={"Login"}
    />
  );
};

export default LoginModal;
