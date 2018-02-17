import path from "path";
import fs from "fs-extra";

export async function getArticlesMetadata() {
  const pathArticles = path.join(__dirname, "../../articles/published");

  const articlesList = await fs.readdir(pathArticles);

  let metadata = articlesList
    .map(articleFolder => path.join(pathArticles, articleFolder))
    // TODO: Make this async.
    .filter(fullPathFolder => fs.lstatSync(fullPathFolder).isDirectory())
    .map(fullPathFolder => path.join(fullPathFolder, "article.js"))
    .map(articleFilePath => require(articleFilePath).default)
    .map(article => article.metadata)
    .map(metadata => transformMetadata(metadata));

  return metadata;
}

function transformMetadata(metadata) {
  const metadataTransformed = {
    title: metadata.title,
    description: formatDescription(metadata.description),
    url: metadata.url,
    datePublication: articleMetadataDateToTimestamp(metadata.datePublication),
    dateLastUpdate: articleMetadataDateToTimestamp(metadata.dateLastUpdate),
    id: metadata.id
  };

  return metadataTransformed;
}

function formatDescription(description) {
  description = description.replace(/\s{2,}/g, " ");
  description = description.trim();
  return description;
}

function articleMetadataDateToTimestamp(dateString) {
  const [date, time] = dateString.split(" ");
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes, seconds] = time.split(":").map(Number);

  return Date.UTC(year, month - 1, day, hours, minutes, seconds);
}
