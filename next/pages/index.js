import Link from "next/link";
import React from "react";
import glamorous from "glamorous";
import fetch from "isomorphic-fetch";
import Layout from "../components/layout.js";
import Spacer from "../components/spacer.js";
import * as s from "../common/styles.js";
import * as date from "../common/date.js";

class Index extends React.Component {
  static async getInitialProps() {
    const reqApi = await fetch("http://localhost:3000/api/articles");
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
              <ArticleDescription>
                {formatDescription(article.description)}
              </ArticleDescription>
            </Article>
          ))}
        </Spacer>
      </Layout>
    );
  }
}

function formatDescription(description) {
  description = description.replace(/\s{2,}/g, " ");
  description = description.trim();
  return description;
}

const Heading = glamorous.h1({
  ...s.fonts.heading,
  paddingTop: s.grid(7),
  paddingBottom: s.grid(3)
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
