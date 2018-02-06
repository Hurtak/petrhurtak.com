import fs from "fs-extra";
import path from "path";
import { sortBy } from "lodash";

const pathArticles = path.join(__dirname, "../../articles");

function validateAndFilterMetadata(metadataArr) {
  let filteredMetadata = [];

  let seenUrs = new Set();
  let seenIds = new Set();

  for (const metadata of metadataArr) {
    let errors = [];

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
    if (seenUrs.has(metadata.url)) {
      errors.push("Url is not unique");
    }
    seenUrs.add(metadata.url);

    if (!metadata.id) {
      errors.push("Id missing");
    }
    if (seenIds.has(metadata.id)) {
      errors.push("Id is not unique");
    }
    seenIds.add(metadata.id);

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

    if (errors.length > 0) {
      console.warn("Invalid metadata", errors, metadata);
    } else {
      filteredMetadata.push(metadata);
    }
  }

  return filteredMetadata;
}

function dateStringToDate(dateString) {
  const [date, time] = dateString.split(" ");
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes, seconds] = time.split(":").map(Number);

  return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
}

function parseMetadata(metadata) {
  return metadata.map(m => {
    m.dateLastUpdate = dateStringToDate(m.dateLastUpdate);
    m.datePublication = dateStringToDate(m.datePublication);

    return m;
  });
}

let metadataCached = null;

async function getPosts() {
  if (metadataCached) {
    return metadataCached;
  }

  const articlesList = await fs.readdir(pathArticles);

  let metadata = articlesList
    .map(articleFolder => path.join(pathArticles, articleFolder))
    .map(fullPathFolder => path.join(fullPathFolder, "article.js"))
    .map(articleFilePath => require(articleFilePath).default)
    .map(article => article.metadata);

  metadata = validateAndFilterMetadata(metadata);
  metadata = parseMetadata(metadata);
  metadata = sortBy(metadata, "dateLastUpdate");
  metadata = metadata.reverse();

  metadataCached = metadata;

  // TODO: remove articles that are in the future

  return metadata;
}

module.exports = getPosts;
