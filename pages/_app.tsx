import "normalize.css";
import "prismjs/themes/prism.css";

import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

import { Layout } from "../src/components/layout/layout-page";
import { config, routes } from "../src/config";
import { useGoogleAnalytics } from "../src/domains/google-analytics";

const App = ({ Component, pageProps }: AppProps) => {
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

        {/* Icons */}
        <link rel="icon" type="image/svg" href={routes.favicon} />

        {/* RSS Links */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`RSS feed for ${config.site.domain}`}
          href={routes.rss.rss2}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title={`Atom feed for ${config.site.domain}`}
          href={routes.rss.atom}
        />
        <link
          rel="alternate"
          type="application/feed+json"
          title={`JSON Feed for ${config.site.domain}`}
          href={routes.rss.jsonFeed}
        />

        {/* Mobile viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default App;
