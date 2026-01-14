import "normalize.css";
import "prismjs/themes/prism.css";
import "./styles/global.css";
import "./setup-dayjs";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app";

const root = document.querySelector("#root");
if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
