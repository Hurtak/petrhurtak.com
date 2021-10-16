import React from "react";

import { getArticles, IArticleMetadata } from "../../../articles/articles-metadata";
import { debugDate } from "../../common/date";
import { HelmetTitle } from "../../components/helmet-title";
import { Link } from "../../components/link";
import { routes } from "../../config/routes";

export const AllArticles = () => {
  const articles = getArticles({ drafts: true, futureArticles: true });

  const drafts = articles.filter((a) => a.draft === true);
  const notDrafts = articles.filter((a) => a.draft === false);

  const now = Date.now();
  const future = notDrafts.filter((a) => a.datePublication > now);
  const published = notDrafts.filter((a) => a.datePublication <= now);

  return (
    <>
      <HelmetTitle>All articles</HelmetTitle>

      <section>
        <h2>Drafts ({drafts.length})</h2>
        <ul>
          <ArticlesList articles={drafts} hiddenArticle={true} />
        </ul>
      </section>

      <section>
        <h2>Future articles ({future.length})</h2>
        <ul>
          <ArticlesList articles={future} hiddenArticle={true} />
        </ul>
      </section>

      <section>
        <h2>Articles ({published.length})</h2>
        <ul>
          <ArticlesList articles={published} hiddenArticle={false} />
        </ul>
      </section>
    </>
  );
};

const ArticlesList = (props: { articles: IArticleMetadata[]; hiddenArticle: boolean }) => (
  <div>
    {props.articles.map((article) => (
      <li key={article.slug}>
        <Link to={props.hiddenArticle ? routes.hiddenArticle.url(article.slug) : routes.article.url(article.slug)}>
          {article.title}
        </Link>{" "}
        ({debugDate(article.datePublication)})
      </li>
    ))}
  </div>
);
