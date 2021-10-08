import "normalize.css";
import "prismjs/themes/prism.css";

import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

import { Layout } from "../src/components/layout";
import { config, routes } from "../src/config";
import { useGoogleAnalytics } from "../src/domains/google-analytics";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useGoogleAnalytics({
    token: config.tokens.googleAnalytics,
    onRouterChange: (cb) => router.events.on("routeChangeComplete", cb),
    onRouterChangeUnsubscribe: (cb) => router.events.off("routeChangeComplete", cb),
  });

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
