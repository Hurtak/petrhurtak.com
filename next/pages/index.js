import React from "react";
import Layout from "./components/layout.js";

class Index extends React.Component {
  static getInitialProps({ req }) {
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    return { userAgent };
  }

  render() {
    return (
      <Layout>
        Hello
        <br />
        Hello2
        <br />
        {this.props.userAgent}
      </Layout>
    );
  }
}

export default Index;
