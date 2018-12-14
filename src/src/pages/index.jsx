import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Article from "../_old_components/Article.jsx";
import Layout from "../components/layout.jsx";

const IndexPage = props => (
  <Layout>
    <h2>Latest stories</h2>
    {props.data.posts.edges.map(post => (
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
