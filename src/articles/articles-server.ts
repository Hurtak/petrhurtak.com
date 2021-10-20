import * as fs from "fs/promises";
import { GetStaticPropsResult } from "next";
import * as path from "path";
import { z } from "zod";

import { getServerRuntimeConfig } from "../config";
import { ArticleMetadata, articleMetadataJsonValidator } from "./types";

type ArticleDirectory = { type: "ARTICLE" | "ARTICLE_HIDDEN"; directory: string; slug: string; date: number };

export const getStaticPropsArticle = async (
  articleFileName: string
): Promise<GetStaticPropsResult<{ articleMetadata: ArticleMetadata }>> => {
  const slug = path.parse(articleFileName).name;
  const serverConfig = getServerRuntimeConfig();
  const articleMetadata = await getArticleMetadata(serverConfig.paths.articles, slug);

  if (!articleMetadata) {
    throw new Error("Could not find article metadata");
  }

  return { props: { articleMetadata } };
};

const getArticlesDirs = async (articlesDir: string): Promise<Array<ArticleDirectory>> => {
  const articlesDirItems = await fs.readdir(articlesDir);

  const articleDirs: Array<ArticleDirectory> = [];
  for (const item of articlesDirItems) {
    const lstat = await fs.lstat(path.join(articlesDir, item));
    const isDir = lstat.isDirectory();

    if (isDir) {
      const dir = parseArticleFolder(item);
      if (dir) {
        articleDirs.push(dir);
      }
    }
  }

  return articleDirs;
};

const parseArticleFolder = (articleFolder: string): ArticleDirectory | null => {
  const matchArticle = articleFolder.match(
    /^(?<hidden>_)?(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})--(?<slug>[\w-]+?)$/
  );

  if (!matchArticle || !matchArticle.groups) {
    return null;
  }

  const validatorGroups = z.object({
    hidden: z.string().optional(),
    year: z.string(),
    month: z.string(),
    day: z.string(),
    slug: z.string(),
  });
  const groups = validatorGroups.parse(matchArticle.groups);

  return {
    type: groups.hidden == null ? "ARTICLE" : "ARTICLE_HIDDEN",
    directory: articleFolder,
    slug: groups.slug,
    date: Date.UTC(Number(groups.year), Number(groups.month) - 1, Number(groups.day)),
  };
};

const articleDirToArticleMetadata = async (
  articlesDir: string,
  articleDir: ArticleDirectory
): Promise<ArticleMetadata> => {
  const articlePath = path.join(articlesDir, articleDir.directory, "metadata.json");
  const metadataRaw = await fs.readFile(articlePath, "utf8");
  const metadataParsed = JSON.parse(metadataRaw);
  const metadata = articleMetadataJsonValidator.parse(metadataParsed);

  const articleData: ArticleMetadata = {
    type: articleDir.type,
    title: metadata.title,
    description: metadata.description,
    datePublication: articleDir.date,
    articlePath: articlePath,
    articleDirectory: articleDir.directory,
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
