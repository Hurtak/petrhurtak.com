import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import dynamic from "next/dynamic";
import ArticlesRouter from "../articles/articles-router.js";
import Layout from "../components/layout.js";
import { ArticleWrapper } from "../components/article.js";
import * as date from "../common/date.js";
import * as s from "../common/styles.js";

class Article extends React.Component {
  static propTypes = {
    articleUrl: PropTypes.string.isRequired
  };

  static async getInitialProps(data) {
    const articleUrl = data.query.articleUrl;

    // Makes sure we wait for the import to resolve before we render the page.
    const article = await ArticlesRouter[articleUrl];

    return { articleUrl: articleUrl, metadata: article.default.metadata };
  }

  render() {
    const Component = dynamic(ArticlesRouter[this.props.articleUrl]);
    const timestampLastUpdate = date.metadataDateToTimestamp(
      this.props.metadata.dateLastUpdate
    );

    return (
      <Layout>
        <Header>
          <Title>{this.props.metadata.title}</Title>
          <Time
            title={date.fullDate(timestampLastUpdate)}
            dateTime={date.dateTimeAttribute(timestampLastUpdate)}
          >
            {date.howLongBefore(timestampLastUpdate)}
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

const Title = glamorous.h1({
  ...s.fonts.heading,
  margin: `${s.grid(7)} 0 0 0`,
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
