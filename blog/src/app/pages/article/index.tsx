import React, { lazy, Suspense } from "react";
import {
  Loading,
  Header,
  ArticleTitle,
  Time,
  Content,
  Footer,
  FooterLink
} from "./styled";
import { NotFound } from "../error/not-found";
import { ArticleErrorBoundary } from "../error/article-error-boundary";
import { HelmetTitle } from "../../components/helmet-title";
import { config } from "../../config/site-config";
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
  const linkTwitter = `https://mobile.twitter.com/search?q=${encodeURIComponent(
    config.siteUrlShort + "/" + article.slug
  )}`;
  const linkGitHub = `https://github.com/Hurtak/hurtak.cc/tree/master/blog/src/articles/${article.folder}`;

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
        <Footer>
          <FooterLink to={linkTwitter}>Discuss on Twitter</FooterLink>
          <FooterLink to={linkGitHub}>Edit on GitHub</FooterLink>
        </Footer>
      </ArticleErrorBoundary>
    </Suspense>
  );
};
