import * as fs from "node:fs/promises";
import * as path from "node:path";

import { GetStaticPropsResult } from "next";
import { z } from "zod";

import { getServerRuntimeConfig } from "../config";
import { ArticleBlog, articleMetadataJsonValidator } from "./types";

type ArticleDirectory = { directory: string; slug: string; date: number; hidden: boolean };

export const getStaticPropsArticle = async (
  articleFileName: string,
): Promise<GetStaticPropsResult<{ articleBlog: ArticleBlog }>> => {
  const slug = path.parse(articleFileName).name;
  const serverConfig = getServerRuntimeConfig();
  const articleBlog = await getArticleBlog(serverConfig.paths.articles, slug);

  if (!articleBlog) {
    throw new Error("Could not find article metadata");
  }

  return { props: { articleBlog } };
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

const parseArticleFolder = (articleFolder: string): ArticleDirectory | undefined => {
  const matchArticle = articleFolder.match(
    /^(?<hidden>_)?(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})--(?<slug>[\w-]+?)$/,
  );

  if (!matchArticle || !matchArticle.groups) {
    return;
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
    directory: articleFolder,
    slug: groups.slug,
    date: Date.UTC(Number(groups.year), Number(groups.month) - 1, Number(groups.day)),
    hidden: Boolean(groups.hidden),
  };
};

const parseArticleLastUpdate = (lastUpdate: string, slug: string): number => {
  const matchDate = lastUpdate.match(/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/);

  if (!matchDate || !matchDate.groups) {
    throw new Error(`Invalid lastUpdate "${lastUpdate}" for article ${slug}`);
  }

  const validatorGroups = z.object({
    year: z.string(),
    month: z.string(),
    day: z.string(),
  });
  const groups = validatorGroups.parse(matchDate.groups);

  return Date.UTC(Number(groups.year), Number(groups.month) - 1, Number(groups.day));
};

const articleDirToArticleBlog = async (articlesDir: string, articleDir: ArticleDirectory): Promise<ArticleBlog> => {
  const articlePath = path.join(articlesDir, articleDir.directory, "metadata.json");
  const metadataRaw = await fs.readFile(articlePath, "utf8");
  const metadataParsed = JSON.parse(metadataRaw) as unknown;
  const metadata = articleMetadataJsonValidator.parse(metadataParsed);

  const dateLastUpdate = metadata.lastUpdate ? parseArticleLastUpdate(metadata.lastUpdate, articleDir.slug) : undefined;

  const articleData: ArticleBlog = {
    id: articleDir.slug,
    type: articleDir.hidden === false ? "ARTICLE_BLOG_VISIBLE" : "ARTICLE_BLOG_HIDDEN",
    title: metadata.title,
    description: metadata.description,
    datePublication: articleDir.date,
    // This data structure is used in next.js getInitialProps and it does not allow using undefined directly because it is
    // not JSON compatible, so it requires us to omit this property or use null.
    ...(dateLastUpdate && { dateLastUpdate }),
    articlePath,
    articleDirectory: articleDir.directory,
    slug: articleDir.slug,
  };
  return articleData;
};

export const getArticlesBlog = async (articlesDir: string): Promise<Array<ArticleBlog>> => {
  const articleDirs = await getArticlesDirs(articlesDir);

  const articlesData: Array<ArticleBlog> = [];
  for (const articleDir of articleDirs) {
    const metadata = await articleDirToArticleBlog(articlesDir, articleDir);
    articlesData.push(metadata);
  }

  return articlesData;
};

export const getArticleBlog = async (articlesDir: string, articleSlug: string): Promise<ArticleBlog | undefined> => {
  const articleDirs = await getArticlesDirs(articlesDir);

  for (const articleDir of articleDirs) {
    const urlSlugNormalized = articleSlug.replace(/^_/, "");
    if (articleDir?.slug === urlSlugNormalized) {
      const metadata = await articleDirToArticleBlog(articlesDir, articleDir);
      return metadata;
    }
  }
};
