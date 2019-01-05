import React, { Suspense, lazy } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import Layout from "./components/layout";
import Index from "./pages/index.jsx";

const Article = lazy(() => import("./articles/01/article.jsx"));

const App = () => (
  <Layout>
    <Router>
      <Index path="/" />
      <Dashboard path="/text" />
    </Router>
  </Layout>
);
export default App;

const Dashboard = (_: RouteComponentProps) => (
  <Suspense key={"1"} fallback={<h1>Loading</h1>}>
    <h2>Dashboard</h2>
    <Article />
  </Suspense>
);
