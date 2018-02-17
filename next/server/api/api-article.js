import fs from "fs-extra";
import path from "path";
import { cloneDeep } from "lodash";

const pathArticles = path.join(__dirname, "../../articles/published");

// TODO: duplicate function
function dateStringToDate(dateString) {
  const [date, time] = dateString.split(" ");
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes, seconds] = time.split(":").map(Number);

  return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
}

// TODO: duplicate function
function parseMetadata(metadata) {
  metadata.dateLastUpdate = dateStringToDate(metadata.dateLastUpdate);
  metadata.datePublication = dateStringToDate(metadata.datePublication);

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
