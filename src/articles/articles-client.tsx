import { NextPage } from "next";
import { FC } from "react";

import { LayoutArticle } from "../components/layout/layout-article";
import { ArticleBlog } from "./types";

export const articlePage = (articleComponent: FC) => {
  const ArticlePage: NextPage<{ articleBlog: ArticleBlog }> = ({ articleBlog }) => (
    <LayoutArticle articleBlog={articleBlog} articleComponent={articleComponent} />
  );

  return ArticlePage;
};
