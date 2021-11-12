import { NextPage } from "next";
import React from "react";

import { LayoutArticle } from "../components/layout/layout-article";
import { ArticleBlog } from "./types";

export const articlePage = (articleComponent: React.FC) => {
  const ArticlePage: NextPage<{ articleBlog: ArticleBlog }> = (props) => (
    <LayoutArticle articleBlog={props.articleBlog} articleComponent={articleComponent} />
  );

  return ArticlePage;
};
