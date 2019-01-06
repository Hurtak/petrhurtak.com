import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import config from "../config/site-config";
import { capitalize } from "../common/text-formatting";
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

const ArticleWrapper = styled.div({
  "> *:first-child": {
    marginTop: 0
  }
});
