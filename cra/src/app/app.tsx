import React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import routes from "./config/routes";
import Layout from "./components/layout";
import Index from "./pages/index";
import Article from "./pages/article";
import NotFound from "./pages/not-found";
import Hello from "./pages/hello/index";
import BuildInformation from "./pages/hello/build-information";
import AllArticles from "./pages/hello/all-articles";
import { getArticles } from "../articles/articles";

const App = () => (
  <Router
    primary={false}
    // To prevent page scrolling router content into viewport
    // We handle scrolling manually in ScrollToTop component
  >
    <RouterPage path={routes.index} pageComponent={Index} />

    <RouterPage path={routes.hidden} pageComponent={Hello} />
    <RouterPage
      path={routes.buildInformation}
      pageComponent={BuildInformation}
    />
    <RouterPage path={routes.allArticles} pageComponent={AllArticles} />
    <RouterPage
      path={routes.hiddenArticle.matcher}
      pageComponent={(props: RouteComponentProps<{ slug: string }>) => (
        <Article
          slug={props.slug}
          getArticlesConfigured={() =>
            getArticles({ drafts: true, futureArticles: true })
          }
        />
      )}
    />

    <RouterPage
      path={routes.article.matcher}
      pageComponent={(props: RouteComponentProps<{ slug: string }>) => (
        <Article
          slug={props.slug}
          getArticlesConfigured={() => getArticles()}
        />
      )}
    />
    <RouterPage default pageComponent={NotFound} />
  </Router>
);
export default App;

const RouterPage = ({
  pageComponent,
  ...routerProps
}: {
  pageComponent: (routerProps: RouteComponentProps) => JSX.Element;
} & RouteComponentProps) => {
  return (
    <Layout>
      <ScrollToTop {...routerProps} />
      {pageComponent(routerProps)}
    </Layout>
  );
};

class ScrollToTop extends React.Component<RouteComponentProps, {}> {
  // https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
  // TODO: rewrite to hooks?

  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location && prevProps.location) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        window.scrollTo(0, 0);
      }
    }
  }

  render() {
    return null;
  }
}
