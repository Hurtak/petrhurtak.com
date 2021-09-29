import "prismjs/themes/prism.css";

import { AppProps } from "next/app";
import Head from "next/head";

import { Layout } from "../src/layout";

export default function App({ Component, pageProps }: AppProps) {
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
