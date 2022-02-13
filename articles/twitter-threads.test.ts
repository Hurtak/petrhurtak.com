import { pipe, reverse, sortBy } from "ramda";

import { ArticleTwitterRaw } from "../src/articles/types";
import { articlesTwitterRaw } from "./twitter-threads";

const testUniquePropertyValue = <T>(items: T[], property: keyof T) => {
  const seen = new Set();
  for (const item of items) {
    const value = item[property];
    if (seen.has(value)) {
      throw new Error(`Duplicate value "${value}" for property "${property}"`);
    }
    seen.add(value);
  }
};

describe("twitter-threads.ts", () => {
  test("titles are unique", async () => {
    testUniquePropertyValue(articlesTwitterRaw, "title");
  });

  test("links are unique", async () => {
    testUniquePropertyValue(articlesTwitterRaw, "link");
  });

  test("sorted by date", async () => {
    const sorted = pipe(
      sortBy((x: ArticleTwitterRaw) => x.datePublication),
      (x) => reverse(x)
    )(articlesTwitterRaw);

    expect(sorted).toEqual(articlesTwitterRaw);
  });
});
