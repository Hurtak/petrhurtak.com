import * as fs from "fs/promises";
import * as path from "path";

import { ArticleMetadata, articleMetadataJsonValidator } from "./types";

export const getArticlesMetadata = async (articlesDir: string): Promise<Array<ArticleMetadata>> => {
  const articlesDirItems = await fs.readdir(articlesDir);

  const articleDirs: Array<string> = [];
  for (const item of articlesDirItems) {
    const lstat = await fs.lstat(path.join(articlesDir, item));
    const isDir = lstat.isDirectory();

    if (isDir && !item.startsWith("_")) {
      articleDirs.push(item);
    }
  }

  const articlesData: Array<ArticleMetadata> = [];
  for (const articleDir of articleDirs) {
    const articlePath = path.join(articlesDir, articleDir, "metadata.json");
    const metadataRaw = await fs.readFile(articlePath, "utf8");
    const metadataParsed = JSON.parse(metadataRaw);
    const metadata = articleMetadataJsonValidator.parse(metadataParsed);

    const articleData: ArticleMetadata = {
      title: metadata.title,
      description: metadata.description,
      datePublication: new Date(metadata.datePublication).getTime(),
      articlePath: articlePath,
      articleDirectory: articleDir,
    };
    articlesData.push(articleData);
  }

  return articlesData;
};
