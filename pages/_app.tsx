import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [animationParent] = useAutoAnimate();
  return (
    <>
      <Head>
        <title>Twitter 2.0 - HD</title>
      </Head>
      <main ref={animationParent}>
        <RegisterModal />
        <LoginModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </>
  );
}
