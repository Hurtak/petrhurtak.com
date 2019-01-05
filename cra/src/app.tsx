import React, { Suspense, lazy } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import Layout from "./components/layout";
import Index from "./pages/index.jsx";

const Article = lazy(() => import("./articles/01/article.jsx"));

const App = () => (
  <Layout>
    <Router>
      <RouterPage path="/" pageComponent={<Index />} />
      <RouterPage path="/text" pageComponent={<Dashboard />} />
    </Router>
  </Layout>
);
export default App;

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;

const Dashboard = () => (
  <Suspense key={"1"} fallback={<h1>Loading</h1>}>
    <h2>Dashboard</h2>
    <Article />
  </Suspense>
);
