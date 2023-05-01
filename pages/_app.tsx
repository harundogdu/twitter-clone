import "@/styles/globals.css";

import React, { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import { IUser } from "@/types/user.type";

import Layout from "@/components/Layout";
import Splash from "@/components/Splash";

import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import Bottom from "@/components/bottom/Bottom";
import useCurrentUser from "@/hooks/useCurrentUser";
import EditModal from "@/components/modals/EditModal";

export default function App({ Component, pageProps }: AppProps) {
  const [animationParent] = useAutoAnimate();
  const { data: isLoggedIn } = useCurrentUser();
  const [pageTitle, setPageTitle] = useState<String>("");

  const user = pageProps.user;
  const name = user?.name;

  useEffect(() => {
    const firstPath = window.location.pathname.substring(1).split("/")[0];

    setPageTitle(firstPath || "Home");

    if (firstPath === "users") {
      setPageTitle(name);
    }
  });

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link
          rel="shortcut icon"
          href="/twitter-favicon.ico"
          type="image/x-icon"
        />
        <title>{pageTitle ? `${pageTitle} / Twitter ` : "Twitter"}</title>
      </Head>
      <main ref={animationParent}>
        <Toaster toastOptions={{ duration: 2000, position: "top-right" }} />
        <Splash></Splash>
        <EditModal />
        <LoginModal />
        <RegisterModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {!isLoggedIn && <Bottom />}
      </main>
    </SessionProvider>
  );
}
