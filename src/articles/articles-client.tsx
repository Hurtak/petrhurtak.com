import { NextPage } from "next";
import React from "react";

import { LayoutArticle } from "../components/layout/layout-article";
import { ArticleMetadata } from "./types";

export const articlePage = (article: React.FC) => {
  const ArticlePage: NextPage<{ articleMetadata: ArticleMetadata }> = (props) => (
    <LayoutArticle articleMetadata={props.articleMetadata} article={article} />
  );

  return ArticlePage;
};
