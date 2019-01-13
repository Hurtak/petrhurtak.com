import sortBy from "lodash/sortBy";
import reverse from "lodash/reverse";

// Article metadata are in separate file because webpack was not able to tree
// shake the article even if we used the {} imports and just imported the metadata

import _example from "./drafts/_example/metadata";
import _components from "./drafts/_components/metadata";

import screen from "./published/2017-04-15--screen/metadata";
import shebang from "./published/2017-04-28--shebang/metadata";
import cssNamedColors from "./published/2017-05-11--css-named-colors/metadata";
import debianPackages from "./published/2017-05-21--debian-packages/metadata";
import ajax from "./published/2017-07-11--ajax/metadata";
import randomNumbers from "./published/2017-07-17--random-numbers/metadata";
import iife from "./published/2017-07-20--iife/metadata";
import commonNamingMistakes from "./published/2017-08-24--common-naming-mistakes/metadata";
import vim from "./published/2017-12-17--vim/metadata";

const articlesMetadataDrafts: IArticleMetadata[] = [
  _example,
  _components
  //
].map(metadata => transformMetadata(metadata, true));
const articlesMetadata: IArticleMetadata[] = [
  screen,
  shebang,
  cssNamedColors,
  debianPackages,
  ajax,
  randomNumbers,
  iife,
  commonNamingMistakes,
  vim
].map(metadata => transformMetadata(metadata, false));

export interface IArticleMetadataRaw {
  title: string;
  description: string;
  slug: string;
  datePublication: string;
  dateLastUpdate: string;
}

export interface IArticleMetadata {
  title: string;
  description: string;
  draft: boolean;
  slug: string;
  datePublication: number;
  dateLastUpdate: number;
  articleImportPromise: () => any;
}

export function getArticles({
  drafts = false,
  futureArticles = false,
  sortByKey = "dateLastUpdate"
}: {
  drafts?: boolean;
  futureArticles?: boolean;
  sortByKey?: keyof IArticleMetadata;
} = {}) {
  let articles = [...articlesMetadata, ...articlesMetadataDrafts];

  if (!drafts) {
    articles = articles.filter(article => article.draft === false);
  }

  if (!futureArticles) {
    articles = articles.filter(article => article.dateLastUpdate <= Date.now());
  }

  articles = sortBy(articles, sortByKey);
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
      return () => import(`./drafts/${metadata.slug}/article.jsx`);
    } else {
      const date = new Date(datePublication);
      const year = date.getUTCFullYear();
      const month = addLeadingZero(date.getUTCMonth() + 1);
      const day = addLeadingZero(date.getUTCDate());

      return () =>
        import(`./published/${year}-${month}-${day}--${
          metadata.slug
        }/article.jsx`);
    }
  })();

  const metadataTransformed: IArticleMetadata = {
    title: metadata.title,

    description: formatDescription(metadata.description),
    draft,
    slug: metadata.slug,

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

function addLeadingZero(input: number): string {
  let str = String(input);
  if (str.length === 1) {
    return "0" + str;
  }
  return str;
}
