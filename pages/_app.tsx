import "normalize.css";
import "prismjs/themes/prism.css";

import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import reactGA from "react-ga";

import { Layout } from "../src/components/layout";
import { config, routes } from "../src/config";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  React.useEffect(() => {
    reactGA.initialize(config.tokens.googleAnalytics);
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
        <title>{config.site.domain}</title>
        <link rel="icon" type="image/svg" href={routes.favicon} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
