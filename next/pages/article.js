import React from "react";
import Layout from "./components/layout.js";
import ArticlesRouter from "../articles/articles-router.js";
import dynamic from "next/dynamic";

class Article extends React.Component {
  static async getInitialProps() {
    // Makes sure we wait for the import to resolve before we render the page.
    await ArticlesRouter["vim"];

    return {};
  }

  render() {
    const Component = dynamic(ArticlesRouter["vim"]);

    return (
      <Layout>
        <Component />
      </Layout>
    );
  }
}

export default Article;
