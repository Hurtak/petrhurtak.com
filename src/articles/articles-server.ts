import * as fs from "fs/promises";
import * as path from "path";

import { getServerRuntimeConfig } from "../config";

export const getStaticPropsArticle = async (fileName: string) => {
  const slug = path.basename(fileName).replace(".js", "");
  const serverConfig = getServerRuntimeConfig();
  const articleMetadata = await getArticleMetadata(serverConfig.paths.articles, slug);

  return { props: { articleMetadata } };
};

import { ArticleMetadata, articleMetadataJsonValidator } from "./types";

const getArticlesDirs = async (articlesDir: string): Promise<Array<string>> => {
  const articlesDirItems = await fs.readdir(articlesDir);

  const articleDirs: Array<string> = [];
  for (const item of articlesDirItems) {
    const lstat = await fs.lstat(path.join(articlesDir, item));
    const isDir = lstat.isDirectory();

    if (isDir && !item.startsWith("_")) {
      articleDirs.push(item);
    }
  }

  return articleDirs;
};

const articleDirToArticleMetadata = async (articlesDir: string, articleDir: string): Promise<ArticleMetadata> => {
  const slug = articleFolderToSlug(articleDir);

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
    slug,
  };
  return articleData;
};

// TODO: some nicer way to do this?
// TODO: test
const articleFolderToSlug = (articleFolder: string): string => articleFolder.split("--")[1];

export const getAllArticlesMetadata = async (articlesDir: string): Promise<Array<ArticleMetadata>> => {
  const articleDirs = await getArticlesDirs(articlesDir);

  const articlesData: Array<ArticleMetadata> = [];
  for (const articleDir of articleDirs) {
    const metadata = await articleDirToArticleMetadata(articlesDir, articleDir);
    articlesData.push(metadata);
  }

  return articlesData;
};

export const getArticleMetadata = async (articlesDir: string, articleSlug: string): Promise<ArticleMetadata | null> => {
  const articleDirs = await getArticlesDirs(articlesDir);

  for (const articleDir of articleDirs) {
    const slug = articleFolderToSlug(articleDir);
    if (slug !== articleSlug) continue;

    const metadata = await articleDirToArticleMetadata(articlesDir, articleDir);
    return metadata;
  }

  return null;
};
