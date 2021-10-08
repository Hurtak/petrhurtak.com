import { RouteComponentProps, Router } from "@reach/router";
import React from "react";

import { getArticles } from "../articles/articles";
import { Layout } from "./components/layout";
import { routes } from "./config/routes";
import { Article } from "./pages/article";
import { NotFound } from "./pages/error/not-found";
import { Hello } from "./pages/hello";
import { AllArticles } from "./pages/hello/all-articles";
import { BuildInformation } from "./pages/hello/build-information";
import { Index } from "./pages/index";

export const App = () => (
  <Router>
    <RouterPage path={routes.index} pageComponent={Index} />

    <RouterPage path={routes.hidden} pageComponent={Hello} />
    <RouterPage path={routes.buildInformation} pageComponent={BuildInformation} />
    <RouterPage path={routes.allArticles} pageComponent={AllArticles} />
    <RouterPage
      path={routes.hiddenArticle.matcher}
      pageComponent={(props: RouteComponentProps<{ slug: string }>) => (
        <Article slug={props.slug} getArticlesConfigured={() => getArticles({ drafts: true, futureArticles: true })} />
      )}
    />

    <RouterPage
      path={routes.article.matcher}
      pageComponent={(props: RouteComponentProps<{ slug: string }>) => (
        <Article slug={props.slug} getArticlesConfigured={() => getArticles()} />
      )}
    />
    <RouterPage default pageComponent={NotFound} />
  </Router>
);

const RouterPage = ({
  pageComponent,
  ...routerProps
}: {
  pageComponent: (routerProps: RouteComponentProps) => JSX.Element;
} & RouteComponentProps) => {
  return <Layout>{pageComponent(routerProps)}</Layout>;
};
