import React from "react";
import PropTypes from "prop-types";
import Error from "../components/error.js";

export default class NextError extends React.Component {
  static propTypes = {
    statusCode: PropTypes.number.isRequired
  };

  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return <Error type={this.props.statusCode === 404 ? "not-found" : null} />;
  }
}
