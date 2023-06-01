import "@/styles/globals.css";

import React, { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

import Layout from "@/components/Layout";
import Splash from "@/components/Splash";

import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import Bottom from "@/components/bottom/Bottom";
import EditModal from "@/components/modals/EditModal";
import TweetModal from "@/components/modals/TweetModal";

import useCurrentUser from "@/hooks/useCurrentUser";

export default function App({ Component, pageProps }: AppProps) {
  const [animationParent] = useAutoAnimate();
  const { data: isLoggedIn } = useCurrentUser();
  const [pageTitle, setPageTitle] = useState<String>("");

  const user = pageProps.user;
  const name = user?.name;

  useEffect(() => {
    const locationPath = window.location.pathname.substring(1).split("/")[0];
    const usersPath = window.location.pathname.substring(1).split("/")[1];

    let title =
      locationPath.charAt(0).toUpperCase() + locationPath.slice(1) || "Home";

    if (locationPath === "users") {
      // TODO: pulled from backend
      title = usersPath;
    }

    setPageTitle(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>
          <link
            rel="shortcut icon"
            href="/twitter-favicon.ico"
            type="image/x-icon"
          />
          <title>{pageTitle ? `${pageTitle} / Twitter ` : "Twitter"}</title>
          <meta
            name="description"
            content="This is a Twitter Clone project built with Next.js, Prisma, MongoDb, Tailwind, Typescript and NextAuth libraries. It is a full-stack project that uses Next.js for the frontend and Prisma for the backend. It is a Twitter clone that allows users to create an account, login, logout, follow other users, like and retweet tweets and more."
          />
        </Head>
        <main ref={animationParent}>
          <div id="portal" />
          <Toaster toastOptions={{ duration: 2000, position: "top-right" }} />
          <Splash />
          <EditModal />
          <LoginModal />
          <RegisterModal />
          <TweetModal />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {!isLoggedIn && <Bottom />}
        </main>
      </SessionProvider>
      <Analytics />
    </>
  );
}
