import { useCallback, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

import ColorUtils from "@/base/colors";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

import Modal from "@/components/shared/Modal";
import Input from "@/components/shared/Input";
import Loading from "@/components/shared/Loading";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmed, setPasswordConfirmed] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const clearInputs = () => {
    setName("");
    setEmail("");
    setUserName("");
    setPassword("");
    setPasswordConfirmed("");
  };

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      if (passwordConfirmed.localeCompare(password) !== 0) {
        toast.error("Passwords doesn't match!");
        return false;
      }

      await axios.post("/api/register", {
        email,
        username,
        name,
        password,
      });

      toast.success("Account has been created successfully!", {
        position: "bottom-right",
      });

      clearInputs();

      signIn("credentials", {
        email,
        password,
      });

      registerModal.onClose();
    } catch (err: any) {
      toast.error(`Something went wrong! ${err.message}`, {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [registerModal, email, username, name, password, passwordConfirmed]);

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
    <p className="text-white">
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
    return <Loading />;
  }

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit}
      actionLabel="Create an account"
      title="Create an account"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
