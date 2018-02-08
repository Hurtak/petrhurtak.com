import fs from "fs-extra";
import path from "path";
import { sortBy } from "lodash";

const pathArticles = path.join(__dirname, "../../articles/published");

function dateStringToDate(dateString) {
  const [date, time] = dateString.split(" ");
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes, seconds] = time.split(":").map(Number);

  return Date.UTC(year, month, day, hours, minutes, seconds);
}

function transformMetadata(metadata) {
  const metadataTransformed = {
    title: metadata.title,
    description: metadata.description,
    url: metadata.url,
    datePublication: dateStringToDate(metadata.datePublication),
    dateLastUpdate: dateStringToDate(metadata.dateLastUpdate),
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
