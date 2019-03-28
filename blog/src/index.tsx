import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app/app";

const rootElement = document.getElementById("root");
if (rootElement) {
  if (rootElement.hasChildNodes()) {
    ReactDOM.hydrate(<App />, rootElement);
  } else {
    ReactDOM.render(<App />, rootElement);
  }
}
