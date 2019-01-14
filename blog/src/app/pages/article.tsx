import React, { lazy, Suspense } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import ReactDisqusComments from "react-disqus-comments";
import NotFound from "./not-found";
import config from "../config/site-config";
import routes from "../config/routes";
import { capitalize } from "../common/text-formatting";
import { IArticleMetadata } from "../../articles/articles";
import * as date from "../common/date";
import * as s from "../common/styles";

const Article = ({
  slug,
  getArticlesConfigured
}: {
  slug?: string;
  getArticlesConfigured: () => IArticleMetadata[];
}) => {
  if (!slug) {
    console.error("Missing slug in article loader");
    return <NotFound />;
  }

  const articles = getArticlesConfigured();
  const article = articles.find(article => article.slug === slug);

  if (!article) {
    return <NotFound />;
  }

  const ArticleContent = lazy(article.articleImportPromise);

  return (
    <Suspense fallback={<Loading />}>
      {/* TODO: proper loading component */}
      {/* TODO: delay settigns? or it is not implemented yet? */}

      <ArticleWrapperStyled>
        <Helmet>
          <title>
            {(() => {
              const pageName = capitalize(article.title);
              const nDash = "\u2013";
              const siteName = capitalize(config.siteUrlShort);

              return `${pageName} ${nDash} ${siteName}`;
            })()}
          </title>
        </Helmet>

        <ArticleErrorBoundary>
          <Header>
            <ArticleTitle>{article.title}</ArticleTitle>
            <Time
              title={date.fullDate(article.dateLastUpdate)}
              dateTime={date.iso(article.dateLastUpdate)}
            >
              {date.howLongBefore(article.dateLastUpdate)}
            </Time>
          </Header>
          <Content>
            <ArticleContent />
          </Content>
          <Comments>
            <CommentsTitle>Comments</CommentsTitle>
            <ReactDisqusComments
              shortname="hurtak"
              identifier={article.slug}
              title={article.title}
              url={config.siteUrl + "/" + routes.article.url(article.slug)}
            />
          </Comments>
        </ArticleErrorBoundary>
      </ArticleWrapperStyled>
    </Suspense>
  );
};
export default Article;

const Loading = () => {
  return null;
};

class ArticleErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    // TODO: log
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // TODO
      return <p>Something went wrong, please try again later</p>;
    }

    return this.props.children;
  }
}

const ArticleWrapperStyled = styled.div({
  "> *:first-child": {
    marginTop: 0
  }
});

const Header = styled.div({
  display: "flex",
  flexDirection: "column"
});

const ArticleTitle = styled.h1({
  ...s.fonts.heading,
  color: s.colors.grayDark
});

const Time = styled.time({
  ...s.fonts.paragraph,
  fontStyle: "italic"
});

const Content = styled.div({
  marginTop: s.grid(3)
});

const Comments = styled.section({
  marginTop: s.grid(3)
});

const CommentsTitle = styled.h2({
  ...s.fonts.headingMedium,
  margin: `${s.grid(7)} 0 ${s.grid(2)} 0`
});
