import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout.jsx";
import Spacer from "../components/spacer.jsx";
import * as s from "../common/styles.js";
import * as date from "../common/date.js";
import * as types from "../common/types.js";

const IndexPage = props => {
  const articles = props.data.articles.edges;

  return (
    <Layout>
      <Heading>Recent articles</Heading>
      <Spacer spacing={4}>
        {articles.map(article => (
          <Article key={article.node.id} article={article.node} />
        ))}
      </Spacer>
    </Layout>
  );
};
IndexPage.propTypes = {
  data: PropTypes.shape({
    articles: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: types.article.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  }).isRequired
};
export default IndexPage;

export const IndexQuery = graphql`
  query IndexQuery {
    articles: allMdx(
      sort: { fields: [frontmatter___dateLastUpdate], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            url
            dateLastUpdate
            description
          }
        }
      }
    }
  }
`;

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
Article.propTypes = {
  article: types.article.isRequired
};

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
  ...s.fonts.small,
  margingTop: s.grid(0.25)
});

const ArticleDescription = styled.p({
  ...s.fonts.paragraph,
  marginTop: s.grid(2)
});
