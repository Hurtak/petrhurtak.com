import React from "react";
import PropTypes from "prop-types";
// import Helmet from "react-helmet";
import { MDXProvider } from "@mdx-js/tag";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
// import { withMDXScope } from "gatsby-mdx/context";
import { graphql } from "gatsby";
import Layout from "../components/layout.jsx";
import * as types from "../common/types.js";
// import styled from "styled-components";
// import config from "../../config/SiteConfig";
// types.articleId "../utils/prismjs-theme.css";

const Article = props => {
  // const post = postNode.frontmatter;
  console.log(props.data);
  // console.log(props.data.mdx.code.body);

  return (
    <Layout>
      <h1>Hello</h1>
      <p>World</p>

      <MDXProvider components={{}}>
        <MDXRenderer>{props.data.mdx.code.body}</MDXRenderer>
      </MDXProvider>

      {/* <SEO postPath={slug} postNode={postNode} postSEO />
        <Helmet title={`${post.title} | ${config.siteTitle}`} />
        <Header>
          <Link to="/">{config.siteTitle}</Link>
        </Header>
        <Content>
          <Title>{post.title}</Title>
          <Subline>
            {post.date} &mdash; {postNode.timeToRead} Min Read &mdash; In{" "}
            <Link to={`/categories/${kebabCase(post.category)}`}>
              {post.category}
            </Link>
          </Subline>
          <PostContent dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <PrevNext prev={prev} next={next} /> */}
    </Layout>
  );
};
Article.propTypes = {
  pageContext: PropTypes.shape({
    id: types.articleId.isRequired,
    url: types.articleUrl.isRequired,
    next: types.article,
    prev: types.article
  }),
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired
  }).isRequired
};

export default Article;

export const postQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      code {
        body
      }
    }
  }
`;
