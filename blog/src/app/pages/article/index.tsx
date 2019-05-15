import React, { lazy, Suspense } from "react";
import ReactDisqusComments from "react-disqus-comments";
import {
  Loading,
  Header,
  ArticleTitle,
  Time,
  Content,
  Comments,
  CommentsTitle
} from "./styled";
import { NotFound } from "../error/not-found";
import { ArticleErrorBoundary } from "../error/article-error-boundary";
import { HelmetTitle } from "../../components/helmet-title";
import { config } from "../../config/site-config";
import { routes } from "../../config/routes";
import { IArticleMetadata } from "../../../articles/articles";
import * as date from "../../common/date";

export const Article = ({
  slug,
  getArticlesConfigured
}: {
  slug?: string;
  getArticlesConfigured: () => IArticleMetadata[];
}) => {
  if (!slug) {
    console.error("Missing slug in article loader");
    return <NotFound />;
  }

  const articles = getArticlesConfigured();
  const article = articles.find(article => article.slug === slug);

  if (!article) {
    return <NotFound />;
  }

  const ArticleContent = lazy(article.articleImportPromise);

  return (
    <Suspense fallback={<Loading />}>
      <HelmetTitle>{article.title}</HelmetTitle>

      <ArticleErrorBoundary>
        <Header>
          <ArticleTitle>{article.title}</ArticleTitle>
          <Time
            title={date.fullDate(article.datePublication)}
            dateTime={date.iso(article.datePublication)}
          >
            {date.howLongBefore(article.datePublication)}
          </Time>
        </Header>
        <Content>
          <ArticleContent />
        </Content>
        <Comments>
          <CommentsTitle>Comments</CommentsTitle>
          <ReactDisqusComments
            shortname="hurtak"
            identifier={article.slug}
            title={article.title}
            url={config.siteUrl + routes.article.url(article.slug)}
          />
        </Comments>
      </ArticleErrorBoundary>
    </Suspense>
  );
};
