import test from "ava";
import lodash from "lodash";

import paths from "../../../src/compile/paths.js";
import articles from "../../../src/compile/articles.js";
import nunjucks from "../../../src/compile/nunjucks/env.js";

const articlesData = articles.getArticles(
  paths.articles,
  paths.articlesDrafts,
  nunjucks
);

test("Required items exist and have correct type", t => {
  const required = [
    ["title", title => lodash.isString(title) && title.length >= 2],
    [
      "description",
      description => lodash.isString(description) && description.length >= 2
    ],
    ["url", url => lodash.isString(url) && url.length >= 2],
    [
      "datePublication",
      date =>
        lodash.isDate(date) &&
        date >= Date.UTC(2015, 0) &&
        date < Date.UTC(2020, 0)
    ],
    [
      "dateLastUpdate",
      date =>
        lodash.isDate(date) &&
        date >= Date.UTC(2015, 0) &&
        date < Date.UTC(2020, 0)
    ],
    ["id", id => lodash.isString(id) && /^[a-f0-9]{32}$/.test(id)]
  ];

  for (const article of articlesData) {
    for (const [property, validationFunction] of required) {
      t.true(property in article.metadata);
      t.true(validationFunction(article.metadata[property]));
    }
  }
});

test("Ids and urls is unique", t => {
  const uniques = ["id", "url"];
  for (const property of uniques) {
    var set = new Set();
    for (const article of articlesData) {
      const item = article.metadata[property];

      t.false(set.has(item));
      set.add(item);
    }
  }
});
