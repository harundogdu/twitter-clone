import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import Layout from "@/components/Layout";

import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import Bottom from "@/components/bottom/Bottom";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function App({ Component, pageProps }: AppProps) {
  const [animationParent] = useAutoAnimate();
  const { data: isLoggedIn } = useCurrentUser();

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Twitter 2.0 - HD</title>
      </Head>
      <main ref={animationParent}>
        <Toaster toastOptions={{ duration: 2000, position: "top-right" }} />
        <RegisterModal />
        <LoginModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {!isLoggedIn && <Bottom />}
      </main>
    </SessionProvider>
  );
}
