import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import fetch from "isomorphic-fetch";
import Layout from "./components/layout.js";
import Spacer from "./components/spacer.js";
import * as s from "./components/styles.js";
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
              {/*
        <article class="ArticlePreview">

          <h2 class="ArticlePreview-title">
            <a
              class="ArticlePreview-title-link"
              href="/{{ article.metadata.url }}/"
            >
              {{ article.metadata.title }}
            </a>
          </h2>

          <time
            class="ArticlePreview-date"
            title="{{ article.metadata.dateLastUpdate | fullDate }}"
            datetime="{{ article.metadata.dateLastUpdate | datetimeAttribute }}"
            data-date-convert
          >
            {{ article.metadata.dateLastUpdate | fullDate }}
          </time>

        </article>
              */}

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
  paddingTop: s.grid(7),
  paddingBottom: s.grid(3)
});

const Article = glamorous.article({});

const ArticleTitle = glamorous.h2({
  margin: 0
});

const ArticleTitleLink = glamorous.a({
  ...s.fonts.headingMedium,
  display: "inline-block",
  textDecoration: "none",
  color: s.colors.blueMain,
  ":hover": {
    textDecoration: "underline"
  }
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
