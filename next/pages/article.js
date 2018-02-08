import React from "react";
import Layout from "./components/layout.js";
import ArticlesRouter from "../articles/articles-router.js";
import dynamic from "next/dynamic";

class Article extends React.Component {
  static async getInitialProps(data) {
    const articleUrl = data.query.articleUrl;

    // Makes sure we wait for the import to resolve before we render the page.
    await ArticlesRouter[articleUrl];

    return { articleUrl: articleUrl };
  }

  render() {
    const Component = dynamic(ArticlesRouter[this.props.articleUrl]);

    return (
      <Layout>
        <Component />
      </Layout>
    );
  }
}

export default Article;
