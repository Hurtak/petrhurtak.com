import React from "react";
import styled from "styled-components";
import Link from "../components/link";
import Spacer from "../components/spacer";
import * as s from "../common/styles";
import * as date from "../common/date";
import { getArticles, IArticleMetadata } from "../../articles/articles";
import routes from "../config/routes";

const IndexPage = () => {
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

export default IndexPage;

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

const Heading = styled.h1({
  ...s.fonts.heading,
  marginBottom: s.grid(3)
});

const ArticleStyled = styled.article({});

const ArticleTitle = styled.h2({
  margin: 0
});

const ArticleTitleLink = styled(Link)({
  ...s.fonts.headingMedium,
  ...s.fonts.link
});

const ArticleDate = styled.time({
  ...s.fonts.paragraphSmall,
  margingTop: s.grid(0.25)
});

const ArticleDescription = styled.p({
  ...s.fonts.paragraph,
  marginTop: s.grid(2)
});
