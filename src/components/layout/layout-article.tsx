import * as React from "react";

import { ArticleMetadataJson } from "../../articles/types";

export const LayoutArticle = ({
  articleMetadata,
  article: Article,
}: {
  articleMetadata: ArticleMetadataJson;
  article: React.FC;
}) => (
  <article>
    <h1>{articleMetadata.title}</h1>

    <Article />
  </article>
);
