import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import Layout from "./layout.js";
import * as s from "../common/styles.js";

export default class Error extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(["not-found"])
  };

  render() {
    switch (this.props.type) {
      case "not-found":
        // TODO: some recommendations for other articles based on
        //       searched article url.

        return (
          <Layout pageTitle="Page not found">
            <Heading>Page not found</Heading>
            <Text>Sorry</Text>
          </Layout>
        );

      default:
        return (
          <Layout pageTitle="Error">
            <Heading>Unknown error happened</Heading>
            <Text>Sorry</Text>
          </Layout>
        );
    }
  }
}

const Heading = glamorous.h1({
  ...s.fonts.heading
});

const Text = glamorous.p({
  ...s.fonts.paragraph,
  paddingTop: s.grid(1)
});
