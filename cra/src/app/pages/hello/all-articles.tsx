import React from "react";
import Helmet from "react-helmet";
import Link from "../../components/link";
import routes from "../../config/routes";
import { IArticleMetadata, getArticles } from "../../../articles/articles";

const AllArticles = () => {
  const articles = getArticles({ drafts: true, futureArticles: true });

  const drafts = articles.filter(a => a.draft === true);
  const notDrafts = articles.filter(a => a.draft === false);

  const now = Date.now();
  const future = notDrafts.filter(a => a.dateLastUpdate > now);
  const published = notDrafts.filter(a => a.dateLastUpdate <= now);

  const renderArticles = (
    articles: IArticleMetadata[],
    hiddenArticle: boolean
  ) =>
    articles.map(article => (
      <li>
        <Link
          to={
            hiddenArticle
              ? routes.hiddenArticle.url(article.url)
              : routes.article.url(article.url)
          }
        >
          {article.title}
        </Link>
      </li>
    ));

  return (
    <>
      <Helmet>
        <title>All articles</title>
      </Helmet>

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
export default AllArticles;
