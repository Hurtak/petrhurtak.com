import { Feed } from "feed";
import * as fs from "node:fs/promises";
import * as path from "node:path";

import { ArticleBlogVisible } from "../articles/types";
import { config, routes } from "../config";

export const generateRssFeed = async (articles: Array<ArticleBlogVisible>, targetFolder: string) => {
  const now = new Date();
  const author = {
    name: config.author.fullName,
    email: config.author.email,
    link: config.author.twitter,
  } as const;
  const siteUrl = routes.absolute(routes.root);

  const feed = new Feed({
    title: config.site.domain,
    id: siteUrl,
    link: siteUrl,
    language: "en",
    favicon: routes.absolute(routes.favicon),
    copyright: `All rights reserved ${now.getFullYear()}, ${config.author.fullName}`,
    updated: now,
    feedLinks: {
      rss2: routes.absolute(routes.rss.rss2),
      json: routes.absolute(routes.rss.jsonFeed),
      atom: routes.absolute(routes.rss.atom),
    },
    author,
  });

  for (const article of articles) {
    const url = routes.absolute(routes.article(article.slug));
    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      description: article.description,
      author: [author],
      date: new Date(article.datePublication),
    });
  }

  await fs.mkdir(path.join(targetFolder, routes.rss.root), { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(targetFolder, routes.rss.rss2), feed.rss2()),
    fs.writeFile(path.join(targetFolder, routes.rss.atom), feed.atom1()),
    fs.writeFile(path.join(targetFolder, routes.rss.jsonFeed), feed.json1()),
  ]);
};
