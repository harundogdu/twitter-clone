import { useCallback, useState } from "react";

import useRegisterModal from "@/hooks/useRegisterModal";

import Modal from "@/components/shared/Modal";
import Input from "../shared/Input";
import ColorUtils from "@/base/colors";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmed, setPasswordConfirmed] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(() => {
    try {
      setLoading(true);
      // TODO Register

      registerModal.onClose();
      console.log("Register successfully");
    } catch (err: any) {
      console.log("Err : ", err.message);
    } finally {
      setLoading(false);
    }
  }, [registerModal]);

  const handleFooterClick = () => {
    loginModal.onOpen();
    registerModal.onClose();
  };

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Input
        type="text"
        placeholder="Enter ur name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Enter ur email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Enter ur username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Enter ur password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Enter ur password again"
        value={passwordConfirmed}
        onChange={(e) => setPasswordConfirmed(e.target.value)}
      />
    </div>
  );

  const footerContent = (
    <p className="text-white space-x-1">
      <span className="mr-2">Have you an account?</span>
      <button
        className="hover:underline"
        style={{ color: ColorUtils.colors.purple }}
        onClick={handleFooterClick}
      >
        Login
      </button>
    </p>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit}
      actionLabel="Sign up"
      title="Sign up"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
