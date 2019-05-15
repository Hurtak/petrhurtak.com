import React from "react";
import { Link } from "../../components/link";
import { routes } from "../../config/routes";
import { HelmetTitle } from "../../components/helmet-title";
import { IArticleMetadata, getArticles } from "../../../articles/articles";

export const AllArticles = () => {
  const articles = getArticles({ drafts: true, futureArticles: true });

  const drafts = articles.filter(a => a.draft === true);
  const notDrafts = articles.filter(a => a.draft === false);

  const now = Date.now();
  const future = notDrafts.filter(a => a.datePublication > now);
  const published = notDrafts.filter(a => a.datePublication <= now);

  const renderArticles = (
    articles: IArticleMetadata[],
    hiddenArticle: boolean
  ) =>
    articles.map(article => (
      <li key={article.slug}>
        <Link
          to={
            hiddenArticle
              ? routes.hiddenArticle.url(article.slug)
              : routes.article.url(article.slug)
          }
        >
          {article.title}
        </Link>
      </li>
    ));

  return (
    <>
      <HelmetTitle>All articles</HelmetTitle>

      <section>
        <h2>Drafts ({drafts.length})</h2>
        <ul>{renderArticles(drafts, true)}</ul>
      </section>

      <section>
        <h2>Future articles ({future.length})</h2>
        <ul>{renderArticles(future, true)}</ul>
      </section>

      <section>
        <h2>Articles ({published.length})</h2>
        <ul>{renderArticles(published, false)}</ul>
      </section>
    </>
  );
};
