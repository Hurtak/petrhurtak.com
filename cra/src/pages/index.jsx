import React from "react";
import styled from "styled-components";
import Link from "../components/link";
import Spacer from "../components/spacer";
import * as s from "../common/styles";
import * as date from "../common/date";

const IndexPage = () => {
  const articles = []; // TODO

  return (
    <>
      <Heading>Recent articles</Heading>
      <Spacer spacing={4}>
        {articles.map(article => (
          <Article key={article.node.id} article={article.node} />
        ))}
      </Spacer>
    </>
  );
};

export default IndexPage;

const Article = props => (
  <ArticleStyled>
    <ArticleTitle>
      <ArticleTitleLink to={`/${props.article.frontmatter.url}/`}>
        {props.article.frontmatter.title}
      </ArticleTitleLink>
    </ArticleTitle>

    {props.article.frontmatter.dateLastUpdate &&
      (() => {
        const dateLastUpdateTimestamp = date.articleDateStringToTimestamp(
          props.article.frontmatter.dateLastUpdate
        );

        return (
          <ArticleDate
            title={date.fullDate(dateLastUpdateTimestamp)}
            dateTime={date.iso(dateLastUpdateTimestamp)}
          >
            {date.howLongBefore(dateLastUpdateTimestamp)}
          </ArticleDate>
        );
      })()}

    <ArticleDescription>
      {props.article.frontmatter.description}
    </ArticleDescription>
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
