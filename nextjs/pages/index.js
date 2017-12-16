import React from "react";
import { rehydrate, css } from "glamor";
import Layout from "../components/layout.js";

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  rehydrate(window.__NEXT_DATA__.ids);
}

css.global("body", {
  margin: 0
});

class Index extends React.Component {
  render() {
    return (
      <Layout>
        Hello
        <br />
        Hello2
      </Layout>
    );
  }
}

export default Index;
