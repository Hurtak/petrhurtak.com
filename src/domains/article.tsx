import React from "react";

import { ArticleMetadata } from "../articles/types";
import { LayoutArticle } from "../components/layout/layout-article";

export const articlePage = (article: React.FC) => {
  const ArticlePage = (props: { articleMetadata: ArticleMetadata }) => (
    <LayoutArticle articleMetadata={props.articleMetadata} article={article} />
  );

  return ArticlePage;
};
