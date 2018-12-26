import React, { Suspense, lazy } from "react";
import { Router, Link } from "@reach/router";
import Layout from "./components/layout.jsx";
import Index from "./pages/index.jsx";

const Article = lazy(() => import("./articles/01/article.jsx"));

const App = ({ children }) => (
  <Layout>
    <Router>
      <Index path="/" />
      <Dashboard path={"/test"} />
    </Router>
  </Layout>
);
export default App;

const Dashboard = () => (
  <Suspense key={"1"} fallback={<h1>Loading</h1>}>
    <h2>Dashboard</h2>
    <Article />
  </Suspense>
);
