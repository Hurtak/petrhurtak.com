import config from "../../src/app/config/site-config";
import routes from "../../src/app/config/routes";
import { utc } from "../../src/app/common/date";
import { getArticles } from "../../src/articles/articles";
import { generateStaticFile } from "./lib/generate-file";

const articlesSliced = getArticles({ limit: config.articles.perRssFeed });

const rssString = `
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
  <channel>
    <title>${config.siteUrlShort}</title>
    <link>${config.siteUrl}</link>
    <description>Blog about web design and technologies</description>

  ${articlesSliced
    .map(
      article => `
          <item>
            <title>${article.title}</title>
            <link>${config.siteUrl}${routes.article.url(article.slug)}</link>
            <guid>${config.siteUrl}${routes.article.url(article.slug)}</guid>
            <pubDate>${utc(article.dateLastUpdate)}</pubDate>
            <description>${article.description}</description>
          </item>
        `
    )
    .join("")}
  </channel>
</rss>
`.trim();

generateStaticFile(rssString, "rss.xml");
