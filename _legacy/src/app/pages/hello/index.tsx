import React from "react";
import { Link } from "../../components/link";
import { HelmetTitle } from "../../components/helmet-title";
import { routes } from "../../config/routes";

export const Hello = () => (
  <>
    <HelmetTitle>Hello</HelmetTitle>

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
          targetBlank
        >
          Article ideas
        </Link>
      </li>
    </ul>
  </>
);
