import React, { Suspense, lazy } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import Layout from "./components/layout";
import Index from "./pages/index";
import NotFound from "./pages/not-found";

const Article = lazy(() => import("../articles/01/article.jsx"));

const App = () => (
  <Layout>
    <Router
      primary={false}
      // To prevent page scrolling router content into viewport
      // We handle scrolling manually in ScrollToTop component
    >
      <RouterPage path="/" pageComponent={<Index />} />
      <RouterPage path="/test" pageComponent={<Test />} />
      <RouterPage path="/:article" pageComponent={<ArticleLoader />} />
      <RouterPage default pageComponent={<NotFound />} />
    </Router>
  </Layout>
);
export default App;

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => {
  return (
    <>
      <ScrollToTop {...props} />
      {props.pageComponent}
    </>
  );
};

const Test = () => (
  <Suspense fallback={<h1>Loading</h1>}>
    <h2>Dashboard</h2>
    <Article />
  </Suspense>
);

const ArticleLoader = () => {
  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <h2>Dashboard</h2>
      <Article />
    </Suspense>
  );
};

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
class ScrollToTop extends React.Component<RouteComponentProps, {}> {
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
