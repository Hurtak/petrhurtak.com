import React from "react";
import { ArticleWrapper, H1, P } from "../../../components/article.js";

export default class Article extends React.Component {
  static metadata = {
    title: "Example article", // Update!

    description: `
      Example article description
    `, // Update!

    url: "example", // Update!

    datePublication: "2018-09-10 16:40:00", // Update!
    dateLastUpdate: "2018-09-10 16:40:00", // Update!

    id: "12883866250d78e7a9e008d46136e3d7" // Update!
  };

  render() {
    return (
      <ArticleWrapper>
        <H1>Article Title</H1>
        <P>Article text</P>
      </ArticleWrapper>
    );
  }
}
