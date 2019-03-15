import React from "react";
import {
  Heading,
  ArticleStyled,
  ArticleTitleLink,
  ArticleDate,
  ArticleDescription
} from "./styled";
import { Spacer } from "../../components/spacer";
import * as date from "../../common/date";
import { routes } from "../../config/routes";
import { getArticles, IArticleMetadata } from "../../../articles/articles";
import { ArticleTitle } from "../article/styled";

export const Index = () => {
  const articles = getArticles();

  return (
    <>
      <Heading>Recent articles</Heading>
      <Spacer spacing={4}>
        {articles.map(article => (
          <Article key={article.slug} article={article} />
        ))}
      </Spacer>
    </>
  );
};

const Article = ({ article }: { article: IArticleMetadata }) => (
  <ArticleStyled>
    <ArticleTitle>
      <ArticleTitleLink to={routes.article.url(article.slug)}>
        {article.title}
      </ArticleTitleLink>
    </ArticleTitle>

    <ArticleDate
      title={date.fullDate(article.dateLastUpdate)}
      dateTime={date.iso(article.dateLastUpdate)}
    >
      {date.howLongBefore(article.dateLastUpdate)}
    </ArticleDate>

    <ArticleDescription>{article.description}</ArticleDescription>
  </ArticleStyled>
);
