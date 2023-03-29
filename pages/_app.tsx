import "@/styles/globals.css";
import type {AppProps} from "next/app";
import Layout from "@/components/Layout";
import Modal from "@/components/shared/Modal";
import ColorUtils from "@/base/colors";
import {useState} from "react";
import LoginModal from "@/components/modals/LoginModal";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <LoginModal />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
