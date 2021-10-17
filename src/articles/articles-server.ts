import * as fs from "fs/promises";
import { GetStaticPropsResult } from "next";
import * as path from "path";

import { getServerRuntimeConfig } from "../config";

type ArticleFolder = { type: "ARTICLE" | "ARTICLE_HIDDEN"; folder: string; slug: string };

export const getStaticPropsArticle = async (
  fileName: string
): Promise<GetStaticPropsResult<{ articleMetadata: ArticleMetadata }>> => {
  const slug = path.basename(fileName).replace(".js", "");
  const serverConfig = getServerRuntimeConfig();
  const articleMetadata = await getArticleMetadata(serverConfig.paths.articles, slug);

  if (!articleMetadata) {
    throw new Error("Could not find article metadata");
  }

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
  const matchArticle = articleFolder.match(/^(?<hidden>_)?\d{4}-\d{2}-\d{2}--(?<slug>[\w-]+?)$/);
  const slugArticle = matchArticle?.groups?.slug;

  if (matchArticle && slugArticle) {
    return {
      type: matchArticle.groups?.hidden == null ? "ARTICLE" : "ARTICLE_HIDDEN",
      folder: articleFolder,
      slug: slugArticle,
    };
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
    type: articleDir.type,
    title: metadata.title,
    description: metadata.description,
    datePublication: new Date(metadata.datePublication).getTime(),
    articlePath: articlePath,
    articleDirectory: articleDir.folder,
    slug: articleDir.slug,
  };
  return articleData;
};

export const getArticlesMetadata = async (articlesDir: string): Promise<Array<ArticleMetadata>> => {
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
    const urlSlugNormalized = articleSlug.replace(/^_/, "");
    if (articleDir?.slug === urlSlugNormalized) {
      const metadata = await articleDirToArticleMetadata(articlesDir, articleDir);
      return metadata;
    }
  }

  return null;
};
