import * as React from "react";

import { ArticleMetadata } from "../../articles/types";

export const LayoutArticle = ({
  articleMetadata,
  article: Article,
}: {
  articleMetadata: ArticleMetadata;
  article: React.FC;
}) => (
  <article>
    <h1>{articleMetadata.title}</h1>

    <Article />
  </article>
);
