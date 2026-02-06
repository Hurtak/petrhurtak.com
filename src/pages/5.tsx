import { NextPage } from "next";

import { ArticlePublished } from "../articles/types";
import { Link } from "../components/article";
import { config, routes } from "../config";
import { date } from "../lib/date";
import image from "../me.jpg";
import { gridCss, gridNumber, pxCss, sizeCss } from "../styles";

export { getStaticProps } from "./index";

type ArticlesGroup = {
  year: number;
  articles: ArticlePublished[];
};

type Props = {
  articles: ArticlesGroup[];
};

const profileImageSize = gridNumber(14);

const HomeSixteen: NextPage<Props> = (props) => (
  <>
    <h1>Hey, I&apos;m Petr</h1>

    <div className="profile">
      <div className="profile-image">
        <img
          src={image.src}
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
      {props.articles.map(({ year, articles }) => (
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

    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500;700&family=Roboto+Mono:wght@400;500&family=Sora:wght@400;500&display=swap");

      :root {
        --bg: #ffffff;
        --ink: #0f172a;
        --muted: #64748b;
        --link: #0f766e;
        --serif: "EB Garamond", serif;
        --sans: "Sora", sans-serif;
        --mono: "Roboto Mono", monospace;
      }

      body {
        background: var(--bg);
        color: var(--ink);
        font-family: var(--sans);
        font-size: 15.5px;
        line-height: 1.76;
      }

      a.link {
        color: var(--link);
      }

      a.link:visited {
        color: var(--link);
      }
    `}</style>

    <style jsx>{`
      h1,
      h2,
      p,
      ul {
        margin-top: 0;
      }

      h1 {
        margin-bottom: ${gridCss(0.5)};
        font-family: var(--serif);
        font-size: 38px;
        font-weight: 700;
        line-height: 1.06;
        letter-spacing: 0.01em;
      }

      h2 {
        margin: 0 0 ${gridCss(0.75)} 0;
        font-family: var(--mono);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--muted);
      }

      ul + h2 {
        margin-top: ${gridCss(1.5)};
      }

      p,
      li {
        font-family: var(--sans);
        font-size: 15.5px;
        line-height: 1.76;
      }

      .profile {
        display: flex;
        flex-direction: row;
        margin-bottom: ${gridCss(1.5)};
      }

      .profile-image {
        display: inline-block;
        border-radius: ${gridCss(1)};
        flex-shrink: 0;
        width: ${sizeCss(profileImageSize)};
        height: ${sizeCss(profileImageSize)};
        margin-top: ${pxCss(3)};
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
        margin-top: 0.62em;
      }

      ul {
        padding-left: ${gridCss(3)};
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      ul ul {
        gap: 5px;
      }

      ul .year {
        display: inline-block;
        margin-bottom: ${gridCss(0.75)};
        font-family: var(--mono);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.18em;
        color: var(--muted);
      }

      ul li:not(:first-child) .year {
        margin-top: ${gridCss(0.75)};
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
        {date.utc(article.datePublication).format("MMM DD")}
        <span className="sep">/</span>
        <abbr className="abbr" title={abbr.title}>
          {abbr.abbr}
        </abbr>
      </span>

      <Link href={href} className="article-link">
        {article.title}
      </Link>

      <style jsx>{`
        .article {
          display: flex;
          align-items: baseline;
          font-size: 15.5px;
          line-height: 1.76;
        }

        .article .article-meta {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-right: 7px;
          padding: 1px 7px 2px;
          border: 1px solid #d8dee8;
          border-radius: 999px;
          background: #f8fafc;
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: 0.08em;
          color: var(--muted);
          white-space: nowrap;
        }

        .article .article-meta .abbr {
          font-weight: 500;
          letter-spacing: 0.16em;
          text-decoration: none;
        }

        .article .article-meta .sep {
          font-size: 9px;
          opacity: 0.6;
        }

        .article .article-link {
          flex-shrink: 0;
          font-family: var(--sans);
        }
      `}</style>
    </span>
  );
};

export default HomeSixteen;
