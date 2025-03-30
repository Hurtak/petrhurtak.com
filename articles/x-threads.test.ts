import { pipe, reverse, sortBy } from "ramda";
import { describe, expect, test } from "vitest";

import { ArticleXRaw } from "../src/articles/types";
import { articlesXRaw } from "./x-threads";

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

describe("x-threads.ts", () => {
  test("titles are unique", () => {
    testUniquePropertyValue(articlesXRaw, "title");
  });

  test("links are unique", () => {
    testUniquePropertyValue(articlesXRaw, "link");
  });

  test("sorted by date", () => {
    const sorted = pipe(
      sortBy((x: ArticleXRaw) => x.datePublication),
      (x) => reverse(x),
    )(articlesXRaw);

    expect(sorted).toEqual(articlesXRaw);
  });
});
