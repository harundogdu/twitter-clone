import React, {useCallback, useState} from "react";

import ColorUtils from "@/base/colors";
import useLoginModal from "@/hooks/useLoginModal";

import Modal from "@/components/shared/Modal";
import Input from "@/components/shared/Input";

const LoginModal = () => {
    const loginModal = useLoginModal();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = useCallback(async () => {
        try {
            setLoading(true);
            // TODO: Login
            loginModal.onClose();
            console.log("Login success")
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [loginModal]);

    if (loading) return (<div>Loading...</div>); // TODO: Loading component

    const handleInputChange = (field: string, value: string) => {
        switch (field) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                type={"text"}
                placeholder={"Email"}
                value={email}
                onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <Input
                type={"password"}
                placeholder={"Password"}
                value={password}
                onChange={(e) => handleInputChange("password", e.target.value)}
            />
        </div>
    );
    const footerContent = (
        <p className="text-white gap-2">
            <span className="mr-2">Henüz bir hesabın yok mu?</span>
            <button className="hover:underline" style={{color: ColorUtils.colors.purple}}>Kaydol</button>
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