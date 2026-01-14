import { FC } from "react";
import { z } from "zod";

import { ArticleBlog, articleMetadataJsonValidator } from "./types";

type ArticleModule = {
  Article: FC;
};

type ArticleEntry = {
  articleBlog: ArticleBlog;
  component: FC;
};

type ArticleDirectory = {
  directory: string;
  slug: string;
  date: number;
  hidden: boolean;
};

const articleModules = import.meta.glob<ArticleModule>("../../articles/**/index.tsx", { eager: true });
const metadataModules = import.meta.glob<{ default?: unknown }>("../../articles/**/metadata.json", { eager: true });

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

const getArticleDirectory = (modulePath: string): ArticleDirectory | undefined => {
  const match = modulePath.match(/articles\/(?<folder>[^/]+)\/index\.tsx$/);
  if (!match?.groups?.folder) {
    return;
  }

  return parseArticleFolder(match.groups.folder);
};

const buildArticleEntry = (modulePath: string, module: ArticleModule): ArticleEntry | undefined => {
  const articleDir = getArticleDirectory(modulePath);
  if (!articleDir) {
    return;
  }

  const metadataPath = modulePath.replace(/index\.tsx$/, "metadata.json");
  const metadataModule = metadataModules[metadataPath];
  if (!metadataModule) {
    return;
  }

  const metadata = articleMetadataJsonValidator.parse(metadataModule.default ?? metadataModule);
  const dateLastUpdate = metadata.lastUpdate ? parseArticleLastUpdate(metadata.lastUpdate, articleDir.slug) : undefined;

  const articleBlog: ArticleBlog = {
    id: articleDir.slug,
    type: articleDir.hidden === false ? "ARTICLE_BLOG_VISIBLE" : "ARTICLE_BLOG_HIDDEN",
    title: metadata.title,
    description: metadata.description,
    datePublication: articleDir.date,
    ...(dateLastUpdate && { dateLastUpdate }),
    articlePath: metadataPath,
    articleDirectory: articleDir.directory,
    slug: articleDir.slug,
  };

  return {
    articleBlog,
    component: module.Article,
  };
};

const articleEntries = Object.entries(articleModules)
  .map(([modulePath, module]) => buildArticleEntry(modulePath, module))
  .filter((entry): entry is ArticleEntry => entry !== undefined);

const articleBySlug = Object.fromEntries(articleEntries.map((entry) => [entry.articleBlog.slug, entry]));

export const getArticleEntry = (slug: string): ArticleEntry | undefined => articleBySlug[slug];

export const articlesBlogVisible = articleEntries
  .map((entry) => entry.articleBlog)
  .filter((article): article is ArticleBlog & { type: "ARTICLE_BLOG_VISIBLE" } => article.type === "ARTICLE_BLOG_VISIBLE");
