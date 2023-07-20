import React, { useCallback, useEffect, useState } from "react";

import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

import ColorUtils from "@/base/colors";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Modal from "@/components/shared/Modal";
import Input from "@/components/shared/Input";
import Loading from "@/components/shared/Loading";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [loginInput, setLoginInput] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const result = await signIn("credentials", {
        loginInput,
        password,
      });

      if (result?.error === "CredentialsSignin") {
        toast.error("Account not found or credentials are incorrect.");
      } else {
        toast.success("Login successfully!");
        loginModal.onClose();
      }
    } catch (error: any) {
      toast.error("Something went wrong!" + error.message);
    } finally {
      setLoading(false);
    }
  }, [loginModal, loginInput, password]);

  useEffect(() => {
    return () => {
      setLoginInput("");
      setPassword("");
    };
  }, []);

  if (loading) return <Loading />;

  const handleFooterClick = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Input
        type={"text"}
        placeholder={"Email or Username"}
        value={loginInput}
        onChange={(e) => setLoginInput(e.target.value)}
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
    <p className="text-white">
      <span className="mr-2">Don&apos;t have an account?</span>
      <a
        className="hover:underline cursor-pointer"
        style={{ color: ColorUtils.colors.main }}
        onClick={handleFooterClick}
      >
        Sign up
      </a>
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
      disabled={!loginInput || !password}
    />
  );
};

export default LoginModal;
