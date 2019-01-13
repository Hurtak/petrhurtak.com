import React from "react";
import Helmet from "react-helmet";
import Link from "../../components/link";
import routes from "../../config/routes";

const HiddenIndex = () => (
  <>
    <Helmet>
      <title>Hello</title>
    </Helmet>

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
