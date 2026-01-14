import "normalize.css";
import "prismjs/themes/prism.css";

import dayjs from "dayjs";
import dayjsUtc from "dayjs/plugin/utc";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { DocumentTitle } from "../components/base/document-title";
import { LayoutPage } from "../components/layout/layout-page";
import { config, routes } from "../config";
import { useGoogleAnalytics } from "../services/google-analytics";

dayjs.extend(dayjsUtc);

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const { setCurrentPage } = useGoogleAnalytics({
    token: config.tokens.googleAnalytics,
  });

  useEffect(() => {
    router.events.on("routeChangeComplete", setCurrentPage);
    return () => router.events.off("routeChangeComplete", setCurrentPage);
  }, [router, setCurrentPage]);

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, Cantarell,
            "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          font-size: 16px;
          line-height: 1.6;
          color: #111;
          text-rendering: auto;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          line-height: 1.25;
        }
      `}</style>

      <DocumentTitle />

      <Head>
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

        <meta name="description" content="Petr Hurtak's personal website and blog"></meta>
      </Head>

      <LayoutPage>
        <Component {...pageProps} />
      </LayoutPage>
    </>
  );
};

export default App;
