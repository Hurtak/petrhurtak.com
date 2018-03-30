import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import dynamic from "next/dynamic";
import config from "next/config";
import fetch from "isomorphic-fetch";
import ArticlesRouter from "../articles/articles-router.js";
import Layout from "../components/layout.js";
import Error from "../components/error.js";
import { ArticleWrapper } from "../components/article.js";
import * as s from "../common/styles.js";
import * as date from "../common/date.js";
import * as sharedPropTypes from "../common/shared-prop-types.js";

const { publicRuntimeConfig } = config();

class Article extends React.Component {
  static propTypes = {
    articleUrl: PropTypes.string.isRequired,
    articleExists: PropTypes.bool.isRequired,
    article: sharedPropTypes.article
  };

  static async getInitialProps(data) {
    const articleUrl = data.query.articleUrl;

    const baseProps = {
      articleUrl: articleUrl,
      articleExists: false
    };

    const articleComponentImport = ArticlesRouter[articleUrl];
    if (!articleComponentImport) {
      return baseProps;
    }

    const req = await fetch(`${publicRuntimeConfig.api}/article/${articleUrl}`);
    if (req.status !== 200) {
      return baseProps;
    }
    const article = await req.json();

    // Makes sure we wait for the import to resolve before we render the page.
    await articleComponentImport();

    return { ...baseProps, articleExists: true, article: article };
  }

  render() {
    if (!this.props.articleExists) {
      return <Error type="not-found" />;
    }

    const Component = dynamic(ArticlesRouter[this.props.articleUrl]());

    return (
      <Layout pageTitle={this.props.article.title}>
        <Header>
          <Heading>{this.props.article.title}</Heading>
          <Time
            title={date.fullDate(this.props.article.dateLastUpdate)}
            dateTime={date.dateTimeAttribute(this.props.article.dateLastUpdate)}
          >
            {date.howLongBefore(this.props.article.dateLastUpdate)}
          </Time>
        </Header>
        <Content>
          <ArticleWrapper>
            <Component />
          </ArticleWrapper>
        </Content>
      </Layout>
    );
  }
}

const Header = glamorous.div({
  display: "flex",
  flexDirection: "column"
});

const Heading = glamorous.h1({
  ...s.fonts.heading,
  color: s.colors.grayDark
});

const Time = glamorous.time({
  ...s.fonts.paragraph,
  fontStyle: "italic"
});

const Content = glamorous.div({
  marginTop: s.grid(3)
});

export default Article;
