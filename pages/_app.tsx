import "prismjs/themes/prism.css";

import { AppProps } from "next/app";

import { Layout } from "../src/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
