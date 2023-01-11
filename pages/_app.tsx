import React from "react";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>CKBK - AI Recipe Generator</title>
        <link rel="icon" href="/chef.png" />
      </Head>

      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </div>
  );
}
