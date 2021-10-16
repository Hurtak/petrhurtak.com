import * as path from "path";

import { getArticleMetadata } from "../articles";
import { getServerRuntimeConfig } from "../config";

export const getStaticPropsArticle = async (fileName: string) => {
  const slug = path.basename(fileName).replace(".js", "");
  const serverConfig = getServerRuntimeConfig();
  const articleMetadata = await getArticleMetadata(serverConfig.paths.articles, slug);

  return { props: { articleMetadata } };
};
