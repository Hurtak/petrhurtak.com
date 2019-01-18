import React from "react";
import Link from "../../components/link";
import Title from "../../components/layout/title";
import routes from "../../config/routes";

const HiddenIndex = () => (
  <>
    <Title>Hello</Title>

    <ul>
      <li>
        <Link to={routes.buildInformation}>Build information</Link>
      </li>
      <li>
        <Link to={routes.allArticles}>Articles</Link>
      </li>
      <li>
        <Link
          to={
            "https://github.com/Hurtak/hurtak.cc/blob/master/blog/src/articles/drafts/article-ideas.txt"
          }
        >
          Article ideas
        </Link>
      </li>
    </ul>
  </>
);
export default HiddenIndex;
