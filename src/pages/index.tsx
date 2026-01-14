import dayjs from "dayjs";
import { groupBy, map, pipe, reverse, sortBy, toPairs } from "ramda";

import { articlesXRaw } from "../../articles/x-threads";
import { parseArticleXRaw } from "../articles/articles";
import { articlesBlogVisible } from "../articles/articles-data";
import { ArticlePublished } from "../articles/types";
import { Link } from "../components/article";
import { DocumentTitle } from "../components/base/document-title";
import { config, routes } from "../config";
import image from "../me.jpg";
import { gridCss, gridNumber, pxCss, sizeCss } from "../styles";

type ArticlesGroup = {
  year: number;
  articles: ArticlePublished[];
};

const profileImageSize = gridNumber(14);
const articlesX = articlesXRaw.map((a) => parseArticleXRaw(a));
const articlesList: ArticlePublished[] = [...articlesBlogVisible, ...articlesX];

const articles: ArticlesGroup[] = pipe(
  groupBy((a: ArticlePublished) => new Date(a.datePublication).getFullYear().toString()),
  (_) => _ as Record<string, ArticlePublished[]>, // TODO: why is this needed?
  toPairs,
  map(
    ([year, articles]: [string, ArticlePublished[]]): ArticlesGroup => ({
      year: Number(year),
      articles: pipe(
        sortBy((a) => a.datePublication),
        (a: ArticlePublished[]) => reverse(a),
      )(articles),
    }),
  ),
  sortBy((g) => g.year),
  (g) => reverse(g),
)(articlesList);

const Home = () => (
  <>
    <DocumentTitle description="Petr Hurtak's personal website and blog" />

    <h1>Hey, I&apos;m Petr</h1>

    <div className="profile">
      <div className="profile-image">
        <img
          src={image}
          width={profileImageSize}
          height={profileImageSize}
          alt={`${config.author.fullName}'s portrait`}
        />
      </div>

      <div className="profile-text">
        <p>
          I am an software engineer with a focus on full-stack TypeScript web app development. I am working on{" "}
          <Link href="https://stockstory.org/">StockStory</Link> and I teach students how to create web apps at{" "}
          <Link href="https://www.cvut.cz/en">Czech Technical University</Link>.
        </p>

        <p>
          In my free time, I like to contribute to open-source on <Link href={config.author.gitHub}>GitHub</Link>, write
          about interesting stuff on this blog or on <Link href={config.author.x}>X</Link>, do rock climbing, or read
          about economics and investing.
        </p>
      </div>
    </div>

    <h2>Links</h2>
    <ul>
      <li>
        <Link href={`mailto:${config.author.email}`}>Email</Link>
      </li>
      <li>
        <Link href={config.author.x}>X</Link>
      </li>
      <li>
        <Link href={config.author.gitHub}>GitHub</Link>
      </li>
      <li>
        <Link href={config.author.linkedIn}>LinkedIn</Link>
      </li>
      <li>
        <Link href={config.author.instagram}>Instagram</Link>
      </li>
      <li>
        <Link href={routes.rss.rss2} newTab>
          RSS
        </Link>
      </li>
    </ul>

    <h2>Articles</h2>
    <ul>
      {articles.map(({ year, articles }) => (
        <li key={year}>
          <span className="year">{year}</span>
          <ul>
            {articles.map((article) => (
              <li key={article.id}>
                <ArticleLi article={article} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>

    <style jsx>{`
      h1,
      h2,
      p,
      ul {
        margin-top: 0;
      }

      .profile {
        display: flex;
        flex-direction: row;
        margin-bottom: ${gridCss(2)};
      }

      .profile-image {
        display: inline-block;
        border-radius: ${gridCss(1)};
        flex-shrink: 0;
        width: ${sizeCss(profileImageSize)};
        height: ${sizeCss(profileImageSize)};
        margin-top: ${pxCss(3)}; // Precisely align with the profile text
        overflow: hidden;
      }

      .profile-text {
        flex-grow: 1;
        padding-left: ${gridCss(1)};
      }

      .profile-text p {
        margin: 0;
      }
      .profile-text p:not(:first-child) {
        margin-top: 0.5em;
      }

      ul {
        padding-left: ${gridCss(3)};
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      ul .year {
        display: inline-block;
        font-family: monospace;
        font-size: 14px;
        margin-bottom: ${gridCss(1)};
      }
      ul li:not(:first-child) .year {
        margin-top: ${gridCss(1)};
      }
    `}</style>
  </>
);

const ArticleLi = ({ article }: { article: ArticlePublished }) => {
  const href = (() => {
    switch (article.type) {
      case "ARTICLE_BLOG_VISIBLE": {
        return routes.article(article.slug);
      }
      case "ARTICLE_X": {
        return article.link;
      }
    }
  })();

  const abbr = (() => {
    switch (article.type) {
      case "ARTICLE_BLOG_VISIBLE": {
        return { title: "Blog Article", abbr: "A" };
      }
      case "ARTICLE_X": {
        return { title: "X Thread", abbr: "X" };
      }
    }
  })();

  return (
    <span className="article">
      <span className="article-meta">
        {dayjs.utc(article.datePublication).format("MMM DD")}
        <span className="sep"> / </span>
        <abbr className="abbr" title={abbr.title}>
          {abbr.abbr}
        </abbr>
        <span className="sep"> / </span>
      </span>

      <Link href={href} className="article-link">
        {article.title}
      </Link>

      <style jsx>{`
        .article {
          display: flex;
          align-items: baseline;
          font-size: 16px;
        }
        .article .article-meta {
          flex-shrink: 0;
          margin-right: 6px;
          font-family: monospace;
          font-size: 14px;
        }
        .article .article-meta .abbr {
          font-weight: bold;
        }
        .article .article-meta .sep {
          letter-spacing: -4px;
          padding-right: 4px;
        }
        .article .article-link {
          flex-shrink: 0;
        }
      `}</style>
    </span>
  );
};

export default Home;
