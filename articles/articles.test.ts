import * as path from "path";
import { describe, expect, test } from "vitest";

import { getArticlesBlog } from "../src/articles/articles-server";

describe("articles", () => {
  const folderRegex = /^(?<hidden>_)?(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})--(?<slug>[\w-]+?)$/;

  describe("getArticlesBlog", () => {
    test("folder name matches pattern", async () => {
      const articles = await getArticlesBlog(path.join(__dirname, "../articles"));

      for (const article of articles) {
        expect(article.articleDirectory).toMatch(folderRegex);
      }
    });

    test("folder name date matches metadata date", async () => {
      const articles = await getArticlesBlog(path.join(__dirname, "../articles"));

      for (const article of articles) {
        const match = article.articleDirectory.match(folderRegex);

        if (!match || !match.groups) {
          throw new Error(`Invalid RegexMatch on ${article.articleDirectory} with ${folderRegex.toString()}`);
        }

        expect(match).toBeTruthy();
        expect(match.groups).toBeTruthy();

        const dateCreated = new Date(article.datePublication);
        expect(dateCreated.getFullYear()).toEqual(Number(match.groups.year));
        expect(dateCreated.getMonth() + 1).toEqual(Number(match.groups.month));
        expect(dateCreated.getDate()).toEqual(Number(match.groups.day));
      }
    });
  });
});
