import dayjs from "dayjs";
import { FC } from "react";

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
  articleComponent: FC;
}) => {
  const datePublication = dayjs.utc(articleBlog.datePublication);

  return (
    <>
      <article>
        <h1>{articleBlog.title}</h1>
        <time title="Publication date" dateTime={datePublication.toISOString()}>
          {datePublication.format("YYYY-MMM-DD")}
        </time>

        <div className="article">
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

        time {
          display: block;
          padding-top: ${gridCss(0.5)};
        }

        .article {
          padding-top: ${gridCss(1)};
        }

        .links {
          margin: 0;
          margin-top: ${gridCss(3)};
        }
      `}</style>
    </>
  );
};
