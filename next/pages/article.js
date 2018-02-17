import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import dynamic from "next/dynamic";
import fetch from "isomorphic-fetch";
import ArticlesRouter from "../articles/articles-router.js";
import Layout from "../components/layout.js";
import Error from "../components/error.js";
import { ArticleWrapper } from "../components/article.js";
import config from "../common/config.js";
import * as date from "../common/date.js";
import * as s from "../common/styles.js";

class Article extends React.Component {
  static propTypes = {
    articleUrl: PropTypes.string.isRequired,
    articleExists: PropTypes.bool.isRequired
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

    const req = await fetch(`${config.api.url}/article/${articleUrl}`);
    if (req.status !== 200) {
      return baseProps;
    }
    const metadata = await req.json();

    // Makes sure we wait for the import to resolve before we render the page.
    await articleComponentImport();

    return { ...baseProps, articleExists: true, metadata: metadata };
  }

  render() {
    if (!this.props.articleExists) {
      return <Error type="not-found" />;
    }

    const Component = dynamic(ArticlesRouter[this.props.articleUrl]());

    return (
      <Layout pageTitle={this.props.metadata.title}>
        <Header>
          <Heading>{this.props.metadata.title}</Heading>
          <Time
            title={date.fullDate(this.props.metadata.dateLastUpdate)}
            dateTime={date.dateTimeAttribute(
              this.props.metadata.dateLastUpdate
            )}
          >
            {date.howLongBefore(this.props.metadata.dateLastUpdate)}
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
