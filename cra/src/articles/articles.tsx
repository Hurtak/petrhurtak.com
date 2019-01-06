import { sortBy, reverse } from "lodash-es";

// import articleIife from "./2017-07-20--iife/metadata";
// import articleVim from "./2017-12-17--vim/metadata";
import articleIife from "./iife/metadata";
import articleVim from "./vim/metadata";

// Article metadata are in separate file because webpack was not able to tree
// shake the article even if we used the {} imports and just imported the metadata

interface IArticleMetadataRaw {
  title: string;
  description: string;
  url: string;
  datePublication: string;
  dateLastUpdate: string;
}

export interface IArticleMetadata {
  title: string;
  description: string;
  url: string;
  datePublication: number;
  dateLastUpdate: number;
  articleImportPromise: () => any;
}

const articlesMetadata: IArticleMetadata[] = [articleIife, articleVim].map(
  transformMetadata
);

export function getAllVisibleArticles() {
  let articles = articlesMetadata;
  articles = articles.filter(article => article.dateLastUpdate <= Date.now());
  articles = sortBy(articles, "dateLastUpdate");
  articles = reverse(articles);
  return articles;
}

function transformMetadata(metadata: IArticleMetadataRaw): IArticleMetadata {
  const metadataTransformed = {
    title: metadata.title,
    description: formatDescription(metadata.description),
    url: metadata.url,
    datePublication: articleMetadataDateToTimestamp(metadata.datePublication),
    dateLastUpdate: articleMetadataDateToTimestamp(metadata.dateLastUpdate),
    articleImportPromise: () => import("./" + metadata.url + "/article.jsx")
  };

  return metadataTransformed;
}

function formatDescription(description: string): string {
  description = description.replace(/\s{2,}/g, " ");
  description = description.trim();
  return description;
}

function articleMetadataDateToTimestamp(dateString: string): number {
  const validationRegex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/;

  const isStringValid = validationRegex.test(dateString);
  if (!isStringValid) {
    throw new Error(
      `Article date string is in invalida format, received "${dateString}", expected pattern ${String(
        validationRegex
      )}`
    );
  }

  const [date, time] = dateString.split(" ");
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute, second] = time.split(":").map(Number);

  return Date.UTC(year, month - 1, day, hour, minute, second);
}
