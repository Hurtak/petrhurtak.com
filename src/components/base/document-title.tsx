import Head from "next/head";

import { config } from "../../config";
import { nDashString } from "./dash";

export const DocumentTitle = ({ title }: { title?: string }) => {
  return (
    <Head>
      <title>{title ? `${title} ${nDashString} ${config.site.documentTitle}` : config.site.documentTitle}</title>
    </Head>
  );
};
