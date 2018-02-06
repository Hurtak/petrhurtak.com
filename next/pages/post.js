import React from "react";
import Layout from "./components/layout.js";

class Post extends React.Component {
  render() {
    return <Layout>{this.props.postUrl}</Layout>;
  }
}

export default Post;
