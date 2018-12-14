import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "styled-components";
import { Article, Wrapper, SectionTitle } from "../_old_components";
import Layout from "../components/layout";
import { media } from "../utils/media";

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 3rem 6rem;
  @media ${media.tablet} {
    padding: 3rem 2rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
  overflow: hidden;
`;

const IndexPage = ({
  data: {
    posts: { edges: postEdges }
  }
}) => (
  <Layout>
    <Wrapper>
      <Content>
        <SectionTitle>Latest stories</SectionTitle>
        {postEdges.map(post => (
          <Article
            title={post.node.frontmatter.title}
            date={post.node.frontmatter.date}
            excerpt={post.node.excerpt}
            timeToRead={post.node.timeToRead}
            slug={post.node.frontmatter.slug}
            category={post.node.frontmatter.category}
            key={post.node.frontmatter.slug}
          />
        ))}
      </Content>
    </Wrapper>
  </Layout>
);
IndexPage.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.shape({
      edges: PropTypes.array.isRequired
    })
  }).isRequired
};

export default IndexPage;

export const IndexQuery = graphql`
  query IndexQuery {
    posts: allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            url
            date(formatString: "DD.MM.YYYY")
            category
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`;
