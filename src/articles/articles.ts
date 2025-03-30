import dayjs from "dayjs";

import { ArticleX, ArticleXRaw } from "./types";

export const parseArticleXRaw = (articleXRaw: ArticleXRaw): ArticleX => {
  return {
    id: articleXRaw.link,
    type: "ARTICLE_X",
    title: articleXRaw.title,
    datePublication: dayjs.utc(articleXRaw.datePublication).valueOf(),
    link: articleXRaw.link,
  };
};
