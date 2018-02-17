import fs from "fs-extra";
import path from "path";
import { cloneDeep } from "lodash";
import * as apiCommon from "./api-common.js";

const pathArticles = path.join(__dirname, "../../articles/published");

// TODO: duplicate function
function parseMetadata(metadata) {
  metadata.dateLastUpdate = apiCommon.articleMetadataDateToTimestamp(
    metadata.dateLastUpdate
  );
  metadata.datePublication = apiCommon.articleMetadataDateToTimestamp(
    metadata.datePublication
  );

  return metadata;
}

export default async function getPost(url) {
  const articlesList = await fs.readdir(pathArticles);

  const articleFolder = articlesList.find(articleFolder => {
    const [folderDate, folderUrl] = articleFolder.split("--");
    return folderUrl === url;
  });

  if (!articleFolder) return null;

  const fullPathFolder = path.join(pathArticles, articleFolder);
  const articleFilePath = path.join(fullPathFolder, "article.js");
  const article = require(articleFilePath).default;

  const metadata = parseMetadata(cloneDeep(article.metadata));

  return metadata;
}
