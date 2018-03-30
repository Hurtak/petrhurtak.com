import config from "../next.config.js";
import { gmt } from "../common/date.js";

export default articles => {
  const articlesSliced = articles.slice(
    0,
    config.publicRuntimeConfig.articles.perRssFeed
  );

  const rssString = `
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
  <channel>
    <title>${config.publicRuntimeConfig.siteUrlShort}</title>
    <link>${config.publicRuntimeConfig.siteUrl}</link>
    <description>Blog about web design and technologies</description>

    ${articlesSliced
      .map(
        article => `
          <item>
            <title>${article.title}</title>
            <link>${config.publicRuntimeConfig.siteUrl}/${article.url}</link>
            <guid>${config.publicRuntimeConfig.siteUrl}/${article.url}</guid>
            <pubDate>${gmt(article.dateLastUpdate)}</pubDate>
            <description>${article.description}</description>
          </item>
        `
      )
      .join("")}
  </channel>
</rss>
  `;

  return rssString.trim();
};
