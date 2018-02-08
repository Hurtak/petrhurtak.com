import articlesRouter from "./articles-router.js";
import { expect } from "global";

test("adds 1 + 2 to equal 3", () => {
  const articles = Object.values(articlesRouter);
  expect(1 + 2).toBe(3);
});

function validateAllMetadata(metadataArr) {
  let seenUrs = new Set();
  let seenIds = new Set();

  for (const metadata of metadataArr) {
    if (seenUrs.has(metadata.url)) {
      return [false, "Url is not unique"];
    }
    seenUrs.add(metadata.url);

    if (seenIds.has(metadata.id)) {
      return [false, "Id is not unique"];
    }
    seenIds.add(metadata.id);
  }

  return [true, null];
}

function valudateMetadata(t, metadata) {
  if (!metadata) {
    errors.push("Metadata missing");
  }

  if (!metadata.title) {
    errors.push("Title missing");
  }

  if (!metadata.description) {
    errors.push("Description missing");
  }

  if (!metadata.url) {
    errors.push("Url missing");
  }

  if (!metadata.id) {
    errors.push("Id missing");
  }

  const regexDataValidator = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/;
  if (!metadata.datePublication) {
    errors.push("datePublication missing");
  }
  if (!regexDataValidator.test(metadata.datePublication)) {
    errors.push("datePublication has wrong format");
  }
  if (!metadata.dateLastUpdate) {
    errors.push("dateLastUpdate missing");
  }
  if (!regexDataValidator.test(metadata.dateLastUpdate)) {
    errors.push("dateLastUpdate has wrong format");
  }
}
