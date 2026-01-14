/* eslint-disable unicorn/prefer-top-level-await */
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import { getArticlesBlog } from "../src/articles/articles-server";
import { ArticleBlogVisible } from "../src/articles/types";
import { generateRssFeed } from "../src/services/rss";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDir, "..");

const articlesDir = path.join(projectRoot, "articles");
const publicDir = path.join(projectRoot, "public");

const run = async () => {
  const articlesBlog = await getArticlesBlog(articlesDir);
  const articlesBlogVisible: ArticleBlogVisible[] = [];

  for (const article of articlesBlog) {
    if (article.type === "ARTICLE_BLOG_VISIBLE") {
      articlesBlogVisible.push(article);
    }
  }

  await generateRssFeed(articlesBlogVisible, publicDir);
};

run().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack ?? error.message : String(error)}\n`);
  process.exitCode = 1;
});
