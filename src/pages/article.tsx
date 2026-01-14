import { useParams } from "react-router-dom";

import { getArticleEntry } from "../articles/articles-data";
import { LayoutArticle } from "../components/layout/layout-article";
import Page404 from "./404";

const ArticlePage = () => {
  const { slug } = useParams();
  const articleEntry = slug ? getArticleEntry(slug) : undefined;

  if (!articleEntry) {
    return <Page404 />;
  }

  return <LayoutArticle articleBlog={articleEntry.articleBlog} articleComponent={articleEntry.component} />;
};

export default ArticlePage;
