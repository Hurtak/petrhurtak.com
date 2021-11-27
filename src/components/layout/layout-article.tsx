import * as React from "react";

import { ArticleBlog } from "../../articles/types";
import { routes } from "../../config";
import { gridCss } from "../../styles";
import { Dot } from "../base/dot";
import { Link } from "../base/link";

export const LayoutArticle = ({
  articleBlog,
  articleComponent: ArticleComponent,
}: {
  articleBlog: ArticleBlog;
  articleComponent: React.FC;
}) => (
  <>
    <article>
      <h1>{articleBlog.title}</h1>

      <ArticleComponent />
    </article>

    <p>
      <Link href={routes.articleGitHubLink(articleBlog.articleDirectory)} newTab>
        Edit on GitHub
      </Link>{" "}
      <Dot />{" "}
      <Link href={routes.articleTwitterSearch(articleBlog.slug)} newTab>
        Discuss on Twitter
      </Link>{" "}
    </p>

    <style jsx>{`
      h1 {
        margin-top: 0;
      }

      p {
        margin-top: ${gridCss(3)};
      }
    `}</style>
  </>
);
