import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import Layout from "../components/layout.js";
import Spacer from "../components/spacer.js";
import config from "../common/config.js";
import * as s from "../common/styles.js";
import * as date from "../common/date.js";
import * as sharedPropTypes from "../common/shared-prop-types.js";

class Index extends React.Component {
  static propTypes = {
    articles: PropTypes.arrayOf(sharedPropTypes.article)
  };

  static async getInitialProps() {
    const reqApi = await fetch(`${config.api.url}/articles`);
    const articles = await reqApi.json();

    return { articles };
  }

  render() {
    return (
      <Layout>
        <Heading>Recent articles</Heading>
        <Spacer spacing={4}>
          {this.props.articles.map(article => (
            <Article key={article.id}>
              <ArticleTitle>
                <Link
                  href={{
                    pathname: "/article",
                    query: { articleUrl: article.url }
                  }}
                  as={`/${article.url}`}
                >
                  <ArticleTitleLink href={`/${article.url}`}>
                    {article.title}
                  </ArticleTitleLink>
                </Link>
              </ArticleTitle>

              <ArticleDate
                title={date.fullDate(article.dateLastUpdate)}
                dateTime={date.dateTimeAttribute(article.dateLastUpdate)}
              >
                {date.howLongBefore(article.dateLastUpdate)}
              </ArticleDate>
              <ArticleDescription>{article.description}</ArticleDescription>
            </Article>
          ))}
        </Spacer>
      </Layout>
    );
  }
}

const Heading = glamorous.h1({
  ...s.fonts.heading,
  marginBottom: s.grid(3)
});

const Article = glamorous.article({});

const ArticleTitle = glamorous.h2({
  margin: 0
});

const ArticleTitleLink = glamorous.a({
  ...s.fonts.headingMedium,
  ...s.fonts.link
});

const ArticleDate = glamorous.time({
  ...s.fonts.small,
  margingTop: s.grid(0.25)
});

const ArticleDescription = glamorous.p({
  ...s.fonts.paragraph,
  marginTop: s.grid(2)
});

export default Index;
