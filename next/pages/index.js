import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import fetch from "isomorphic-fetch";
import Layout from "./components/layout.js";
import Spacer from "./components/spacer.js";
import * as s from "./components/styles.js";

class Index extends React.Component {
  static async getInitialProps() {
    const reqApi = await fetch("http://localhost:3000/api/posts");
    const posts = await reqApi.json();

    return { posts };
  }

  render() {
    return (
      <Layout>
        <Heading>Recent articles</Heading>
        <Spacer>
          {this.props.posts.map(post => (
            <Post key={post.id}>
              <Link href={{ pathname: "/post", query: { postUrl: post.url } }}>
                <h2>
                  <a href={`/${post.url}`}>{post.title}</a>
                </h2>
              </Link>
              <p>{post.description}</p>
            </Post>
          ))}
        </Spacer>
      </Layout>
    );
  }
}

const Heading = glamorous.h1({
  ...s.fonts.heading,
  paddingTop: s.grid(7),
  paddingBottom: s.grid(3)
});

const Post = glamorous.div({});

export default Index;
