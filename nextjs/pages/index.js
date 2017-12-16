import React from "react";
import { rehydrate, css } from "glamor";
import glamorous from "glamorous";

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  rehydrate(window.__NEXT_DATA__.ids);
}

const main = () => {
  css.global("body", {
    margin: 0
  });

  return <React.Fragment>Hello</React.Fragment>;
};

export default main;
