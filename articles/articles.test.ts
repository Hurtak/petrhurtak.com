import * as path from "path";

import { getAllArticlesMetadata } from "../src/articles/articles-server";

describe("articles", () => {
  const folderRegex = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})--[\w-]+?$/;

  describe("getAllArticlesMetadata", () => {
    test("folder name matches pattern", async () => {
      const articles = await getAllArticlesMetadata(path.join(__dirname, "../articles"));

      for (const article of articles) {
        expect(article.articleDirectory).toMatch(folderRegex);
      }
    });

    test("folder name date matches metadata date", async () => {
      const articles = await getAllArticlesMetadata(path.join(__dirname, "../articles"));

      for (const article of articles) {
        const match = article.articleDirectory.match(folderRegex);

        if (!match || !match.groups) {
          throw new Error(`Invalid RegexMatch on ${article} with ${folderRegex.toString()}`);
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
