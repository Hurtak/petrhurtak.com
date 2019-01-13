import React, { lazy, Suspense } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import config from "../config/site-config";
import { capitalize } from "../common/text-formatting";
import { IArticleMetadata } from "../../articles/articles";
import NotFound from "./not-found";

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
          <ArticleContent />
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
