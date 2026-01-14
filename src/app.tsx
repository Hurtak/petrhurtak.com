import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { LayoutPage } from "./components/layout/layout-page";
import { config } from "./config";
import Page404 from "./pages/404";
import ArticlePage from "./pages/article";
import Debug from "./pages/debug";
import Home from "./pages/index";
import { useGoogleAnalytics } from "./services/google-analytics";

const AppRoutes = () => {
  const location = useLocation();
  const { setCurrentPage } = useGoogleAnalytics({
    token: config.tokens.googleAnalytics,
  });

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname, setCurrentPage]);

  return (
    <LayoutPage>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/articles/:slug"} element={<ArticlePage />} />
        <Route path={"/_debug"} element={<Debug />} />
        <Route path={"*"} element={<Page404 />} />
      </Routes>
    </LayoutPage>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
