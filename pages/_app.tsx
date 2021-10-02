import "prismjs/themes/prism.css";

import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import reactGA from "react-ga";

import { config } from "../src/config";
import { Layout } from "../src/layout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  React.useEffect(() => {
    reactGA.initialize(config.googleAnalyticsId);
  }, []);

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      reactGA.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>

      <Head>
        <title>petrhurtak.com</title>
        <link rel="icon" type="image/svg" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
