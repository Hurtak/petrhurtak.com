import React from "react";

import { LayoutArticle } from "../components/layout/layout-article";
import { ArticleMetadata } from "./types";

export const articlePage = (article: React.FC) => {
  const ArticlePage = (props: { articleMetadata: ArticleMetadata }) => (
    <LayoutArticle articleMetadata={props.articleMetadata} article={article} />
  );

  return ArticlePage;
};
