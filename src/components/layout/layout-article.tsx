import * as dayjs from "dayjs";
import { FC } from "react";

import { ArticleBlog } from "../../articles/types";
import { routes } from "../../config";
import { gridCss } from "../../styles";
import { DocumentTitle } from "../base/document-title";
import { Dot } from "../base/dot";
import { Link } from "../base/link";

export const LayoutArticle = ({
  articleBlog,
  articleComponent: ArticleComponent,
}: {
  articleBlog: ArticleBlog;
  articleComponent: FC;
}) => {
  const datePublication = dayjs.utc(articleBlog.datePublication);
  const dateLastUpdate = articleBlog.dateLastUpdate ? dayjs.utc(articleBlog.dateLastUpdate) : null;

  const formatDate = (dayjs: dayjs.Dayjs): string => dayjs.format("YYYY-MMM-DD");

  return (
    <>
      <DocumentTitle title={articleBlog.title} />

      <article>
        <h1>{articleBlog.title}</h1>

        <p className="time-wrapper">
          {dateLastUpdate ? (
            <>
              Published{" "}
              <time title="Publication date" dateTime={datePublication.toISOString()}>
                {formatDate(datePublication)}
              </time>
              <br />
              Updated:{" "}
              <time title="Last update date" dateTime={dateLastUpdate.toISOString()}>
                {formatDate(dateLastUpdate)}
              </time>
            </>
          ) : (
            <time title="Publication date" dateTime={datePublication.toISOString()}>
              {formatDate(datePublication)}
            </time>
          )}
        </p>
        <div className="article-content">
          <ArticleComponent />
        </div>
      </article>

      <p className="links">
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
          margin: 0;
        }

        .time-wrapper {
          margin: 0;
        }

        time {
          display: inline-block;
          padding-top: ${gridCss(0.5)};
        }

        .article-content {
          padding-top: ${gridCss(5)};
        }

        .article-content > :global(*) {
          margin: ${gridCss(2)} 0;
        }
        .article-content > :global(*:first-child) {
          margin-top: 0;
        }
        .article-content > :global(*:last-child) {
          margin-bottom: 0;
        }

        .links {
          margin: 0;
          margin-top: ${gridCss(3)};
        }
      `}</style>
    </>
  );
};
