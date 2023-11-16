import { pipe, reverse, sortBy } from "ramda";
import { describe, expect, test } from "vitest";

import { ArticleTwitterRaw } from "../src/articles/types";
import { articlesTwitterRaw } from "./twitter-threads";

const testUniquePropertyValue = <T extends Record<string, unknown>>(items: T[], property: keyof T) => {
  const seen = new Set();
  for (const item of items) {
    const value = item[property];
    if (seen.has(value)) {
      throw new Error(`Duplicate value "${String(value)}" for property "${String(property)}"`);
    }
    seen.add(value);
  }
};

describe("twitter-threads.ts", () => {
  test("titles are unique", () => {
    testUniquePropertyValue(articlesTwitterRaw, "title");
  });

  test("links are unique", () => {
    testUniquePropertyValue(articlesTwitterRaw, "link");
  });

  test("sorted by date", () => {
    const sorted = pipe(
      sortBy((x: ArticleTwitterRaw) => x.datePublication),
      (x) => reverse(x),
    )(articlesTwitterRaw);

    expect(sorted).toEqual(articlesTwitterRaw);
  });
});
