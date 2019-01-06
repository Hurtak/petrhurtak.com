import React, { Children } from "react";
import Helmet from "react-helmet";
import config from "../config/site-config";
import { capitalize } from "../common/text-formatting";
import { ArticleWrapper } from "../components/article";
import { IArticleMetadata } from "../../articles/articles";

const Article = (props: {
  article: IArticleMetadata;
  children: React.ReactNode;
}) => {
  return (
    <ArticleWrapper>
      <Helmet>
        <title>
          {(() => {
            const pageName = capitalize(props.article.title);
            const nDash = "\u2013";
            const siteName = capitalize(config.siteUrlShort);

            return `${pageName} ${nDash} ${siteName}`;
          })()}
        </title>
      </Helmet>

      {props.children}
    </ArticleWrapper>
  );
};
export default Article;
