import { sortBy, reverse } from "lodash-es";

// Article metadata are in separate file because webpack was not able to tree
// shake the article even if we used the {} imports and just imported the metadata

import _example from "./drafts/_example/metadata";

import vim from "./published/2017-12-17--vim/metadata";

const articlesMetadataDrafts: IArticleMetadata[] = [_example].map(metadata =>
  transformMetadata(metadata, true)
);
const articlesMetadata: IArticleMetadata[] = [vim].map(metadata =>
  transformMetadata(metadata, false)
);

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
  draft: boolean;
  url: string;
  datePublication: number;
  dateLastUpdate: number;
  articleImportPromise: () => any;
}

export function getAllVisibleArticles() {
  let articles = articlesMetadata;
  articles = articles.filter(article => article.dateLastUpdate <= Date.now());
  articles = sortBy(articles, "dateLastUpdate");
  articles = reverse(articles);
  return articles;
}

export function getArticles({
  drafts = false,
  futureArticles = false
}: {
  drafts?: boolean;
  futureArticles?: boolean;
} = {}) {
  let articles = [...articlesMetadata, ...articlesMetadataDrafts];

  if (!drafts) {
    articles = articles.filter(article => article.draft === false);
  }

  if (!futureArticles) {
    articles = articles.filter(article => article.dateLastUpdate <= Date.now());
  }

  articles = sortBy(articles, "dateLastUpdate");
  articles = reverse(articles);
  return articles;
}

function transformMetadata(
  metadata: IArticleMetadataRaw,
  draft: boolean
): IArticleMetadata {
  const datePublication = articleMetadataDateToTimestamp(
    metadata.datePublication
  );

  const articleImportPromise = (() => {
    if (draft) {
      return () => import(`./drafts/${metadata.url}/article`);
    } else {
      const date = new Date(datePublication);
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth() + 1;
      const day = date.getUTCDate();

      return () =>
        import(`./published/${year}-${month}-${day}--${metadata.url}/article`);
    }
  })();

  const metadataTransformed: IArticleMetadata = {
    title: metadata.title,

    description: formatDescription(metadata.description),
    draft,
    url: metadata.url,

    datePublication,
    dateLastUpdate: articleMetadataDateToTimestamp(metadata.dateLastUpdate),

    articleImportPromise
  };

  return metadataTransformed;
}

// TODO: is this duplicate code with article.js strip-indent module?
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
