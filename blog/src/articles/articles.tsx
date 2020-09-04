import sortBy from "lodash/sortBy";
import reverse from "lodash/reverse";
import { articlesDrafts, articlesPublished } from "../generated/articles-list";

const articlesMetadataDrafts: IArticleMetadata[] = articlesDrafts.map(
  metadata => transformMetadata(metadata, true)
);
const articlesMetadata: IArticleMetadata[] = articlesPublished.map(metadata =>
  transformMetadata(metadata, false)
);

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
  folder: string;
  articleImportPromise: () => Promise<{ default: any }>;
}

export function getArticles({
  limit = 10,
  drafts = false,
  futureArticles = false,
  sortByKey = "datePublication",
  desc = true
}: {
  limit?: number;
  drafts?: boolean;
  futureArticles?: boolean;
  sortByKey?: keyof IArticleMetadata;
  desc?: boolean;
} = {}) {
  let articles = [...articlesMetadata, ...articlesMetadataDrafts];

  if (!drafts) {
    articles = articles.filter(article => article.draft === false);
  }

  if (!futureArticles) {
    articles = articles.filter(
      article => article.datePublication <= Date.now()
    );
  }

  articles = sortBy(articles, sortByKey);

  if (desc) {
    articles = reverse(articles);
  }

  articles = articles.slice(0, limit);
  return articles;
}

function transformMetadata(
  metadata: IArticleMetadataRaw,
  draft: boolean
): IArticleMetadata {
  const datePublication = articleMetadataDateToTimestamp(
    metadata.datePublication
  );

  const date = new Date(datePublication);
  const year = date.getUTCFullYear();
  const month = addLeadingZero(date.getUTCMonth() + 1);
  const day = addLeadingZero(date.getUTCDate());

  const folder = draft
    ? `drafts/${metadata.slug}/article.jsx`
    : `published/${year}-${month}-${day}--${metadata.slug}/article.jsx`;

  const articleImportPromise = draft
    ? () => import(`./drafts/${metadata.slug}/article.jsx`)
    : () =>
        import(
          `./published/${year}-${month}-${day}--${metadata.slug}/article.jsx`
        );

  const metadataTransformed: IArticleMetadata = {
    title: metadata.title,

    description: formatDescription(metadata.description),
    draft,
    slug: metadata.slug,
    folder,

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
      `Article date string is in invalid format, received "${dateString}", expected pattern ${String(
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
