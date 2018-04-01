import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import dynamic from "next/dynamic";
import config from "next/config";
import fetch from "isomorphic-fetch";
import ReactDisqusComments from "react-disqus-comments";
import ArticlesRouter from "../articles/articles-router.js";
import Layout from "../components/layout.js";
import Error from "../components/error.js";
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

  static async getInitialProps(ctx) {
    const articleUrl = ctx.query.articleUrl;

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

    const ArticleComponent = dynamic(ArticlesRouter[this.props.articleUrl]());

    return (
      <Layout pageTitle={this.props.article.title}>
        <Header>
          <ArticleTitle>{this.props.article.title}</ArticleTitle>
          <Time
            title={date.fullDate(this.props.article.dateLastUpdate)}
            dateTime={date.dateTimeAttribute(this.props.article.dateLastUpdate)}
          >
            {date.howLongBefore(this.props.article.dateLastUpdate)}
          </Time>
        </Header>
        <Content>
          <ArticleComponent />
        </Content>
        <Comments>
          <CommentsTitle>Comments</CommentsTitle>
          <ReactDisqusComments
            shortname="hurtak"
            identifier={this.props.article.id}
            title={this.props.article.title}
            url={publicRuntimeConfig.siteUrl + "/" + this.props.articleUrl}
          />
        </Comments>
      </Layout>
    );
  }
}

const Header = glamorous.div({
  display: "flex",
  flexDirection: "column"
});

const ArticleTitle = glamorous.h1({
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

const Comments = glamorous.section({
  marginTop: s.grid(3)
});

const CommentsTitle = glamorous.h2({
  ...s.fonts.headingMedium,
  margin: `${s.grid(7)} 0 ${s.grid(2)} 0`
});

export default Article;
