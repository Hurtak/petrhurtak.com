import * as React from "react";

import { ArticleBlog } from "../../articles/types";

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

    <style jsx>{`
      h1 {
        margin-top: 0;
      }
    `}</style>
  </>
);
