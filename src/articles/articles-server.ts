import * as fs from "fs/promises";
import * as path from "path";

import { getServerRuntimeConfig } from "../config";

type ArticleFolder = { folder: string; slug: string };

export const getStaticPropsArticle = async (fileName: string) => {
  const slug = path.basename(fileName).replace(".js", "");
  const serverConfig = getServerRuntimeConfig();
  const articleMetadata = await getArticleMetadata(serverConfig.paths.articles, slug);

  return { props: { articleMetadata } };
};

import { ArticleMetadata, articleMetadataJsonValidator } from "./types";

const getArticlesDirs = async (articlesDir: string): Promise<Array<ArticleFolder>> => {
  const articlesDirItems = await fs.readdir(articlesDir);

  const articleDirs: Array<ArticleFolder> = [];
  for (const item of articlesDirItems) {
    const lstat = await fs.lstat(path.join(articlesDir, item));
    const isDir = lstat.isDirectory();

    if (isDir) {
      const folder = parseArticleFolder(item);
      if (folder) {
        articleDirs.push(folder);
      }
    }
  }

  return articleDirs;
};

const parseArticleFolder = (articleFolder: string): ArticleFolder | null => {
  const match = articleFolder.match(/^\d{4}-\d{2}-\d{2}--(?<slug>[\w-]+)$/);
  const slug = match?.groups?.slug;

  if (match && slug) {
    return { folder: articleFolder, slug };
  }

  return null;
};

const articleDirToArticleMetadata = async (
  articlesDir: string,
  articleDir: ArticleFolder
): Promise<ArticleMetadata> => {
  const articlePath = path.join(articlesDir, articleDir.folder, "metadata.json");
  const metadataRaw = await fs.readFile(articlePath, "utf8");
  const metadataParsed = JSON.parse(metadataRaw);
  const metadata = articleMetadataJsonValidator.parse(metadataParsed);

  const articleData: ArticleMetadata = {
    title: metadata.title,
    description: metadata.description,
    datePublication: new Date(metadata.datePublication).getTime(),
    articlePath: articlePath,
    articleDirectory: articleDir.folder,
    slug: articleDir.slug,
  };
  return articleData;
};

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
    if (articleDir?.slug === articleSlug) {
      const metadata = await articleDirToArticleMetadata(articlesDir, articleDir);
      return metadata;
    }
  }

  return null;
};
