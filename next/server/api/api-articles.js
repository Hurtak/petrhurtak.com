import fs from "fs-extra";
import path from "path";
import { sortBy } from "lodash";
import * as apiCommon from "./api-common.js";

const pathArticles = path.join(__dirname, "../../articles/published");

function transformMetadata(metadata) {
  const metadataTransformed = {
    title: metadata.title,
    description: metadata.description,
    url: metadata.url,
    datePublication: apiCommon.articleMetadataDateToTimestamp(
      metadata.datePublication
    ),
    dateLastUpdate: apiCommon.articleMetadataDateToTimestamp(
      metadata.dateLastUpdate
    ),
    id: metadata.id
  };

  return metadataTransformed;
}

export default async function getPosts() {
  const articlesList = await fs.readdir(pathArticles);

  let metadata = articlesList
    .map(articleFolder => path.join(pathArticles, articleFolder))
    // TODO: Make this async.
    .filter(fullPathFolder => fs.lstatSync(fullPathFolder).isDirectory())
    .map(fullPathFolder => path.join(fullPathFolder, "article.js"))
    .map(articleFilePath => require(articleFilePath).default)
    .map(article => article.metadata)
    .map(metadata => transformMetadata(metadata))
    // TODO: test this
    .filter(metadata => metadata.dateLastUpdate <= Date.now());

  metadata = sortBy(metadata, "dateLastUpdate");
  metadata = metadata.reverse();

  return metadata;
}
