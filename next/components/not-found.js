import React from "react";
import glamorous from "glamorous";
import Layout from "./layout.js";
import * as s from "../common/styles.js";

export default class NotFound extends React.Component {
  render() {
    return (
      <Layout pageTitle="Page not found">
        <Heading>Page not found</Heading>
        <Text>Sorry</Text>
      </Layout>
    );
  }
}

const Heading = glamorous.h1({
  ...s.fonts.heading
});

const Text = glamorous.p({
  ...s.fonts.paragraph,
  paddingTop: s.grid(1)
});
