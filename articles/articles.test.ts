import { describe, expect, test } from "vitest";

import { getArticlesBlog } from "../src/articles/articles-server";

const getArticles = () => getArticlesBlog(__dirname);

describe("getArticlesBlog", () => {
  describe("folder name", () => {
    const regex = /^(?<hidden>_)?(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})--(?<slug>[\w-]+?)$/;

    test("folder name matches pattern", async () => {
      const articles = await getArticles();

      for (const article of articles) {
        expect(article.articleDirectory).toMatch(regex);
      }
    });

    test("folder name date matches metadata date", async () => {
      const articles = await getArticles();

      for (const article of articles) {
        const match = article.articleDirectory.match(regex);

        if (!match || !match.groups) {
          throw new Error(`Invalid RegexMatch on ${article.articleDirectory} with ${regex.toString()}`);
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

  describe("dateLastUpdate", () => {
    test("dateLastUpdate is after datePublication", async () => {
      const articles = await getArticles();

      for (const article of articles) {
        if (!article.dateLastUpdate) continue;
        expect(article.dateLastUpdate).greaterThan(article.datePublication);
      }
    });
  });
});
