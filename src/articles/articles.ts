import dayjs from "dayjs";

import { ArticleTwitter, ArticleTwitterRaw } from "./types";

export const parseArticleTwitterRaw = (articleTwitterRaw: ArticleTwitterRaw): ArticleTwitter => {
  return {
    id: articleTwitterRaw.link,
    type: "ARTICLE_TWITTER",
    title: articleTwitterRaw.title,
    datePublication: dayjs.utc(articleTwitterRaw.datePublication).valueOf(),
    link: articleTwitterRaw.link,
  };
};
