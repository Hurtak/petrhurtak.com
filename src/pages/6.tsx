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

const HomeSix: NextPage<Props> = (props) => (
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
      @import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap");

      :root {
        --bg: #ffffff;
        --ink: #101010;
        --muted: #6b6b6b;
        --link: #1b3a2f;
        --serif: "Libre Baskerville", serif;
        --sans: "IBM Plex Sans", sans-serif;
        --mono: "IBM Plex Mono", monospace;
      }

      body {
        background: var(--bg);
        color: var(--ink);
        font-family: var(--sans);
      }

      :global(a.link) {
        color: var(--link);
      }

      :global(a.link:visited) {
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
        font-family: var(--serif);
        font-size: 34px;
        letter-spacing: -0.01em;
        margin-bottom: ${gridCss(1)};
      }

      h2 {
        font-family: var(--mono);
        font-size: 11px;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        margin-bottom: ${gridCss(1)};
        color: var(--muted);
      }

      p,
      li {
        font-family: var(--sans);
        font-size: 16px;
        line-height: 1.75;
      }

      .profile {
        display: flex;
        flex-direction: row-reverse;
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
        padding-left: 0;
        padding-right: ${gridCss(1)};
      }

      .profile-text p {
        margin: 0;
      }
      .profile-text p:not(:first-child) {
        margin-top: 0.75em;
      }

      ul {
        padding-left: ${gridCss(3)};
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      ul .year {
        display: inline-block;
        font-family: var(--mono);
        font-size: 11px;
        letter-spacing: 0.22em;
        color: var(--muted);
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
        {date.utc(article.datePublication).format("MMM DD")}
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
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--muted);
        }
        .article .article-meta .abbr {
          font-weight: 600;
        }
        .article .article-meta .sep {
          letter-spacing: -4px;
          padding-right: 4px;
        }
        .article .article-link {
          flex-shrink: 0;
          font-family: var(--sans);
        }
      `}</style>
    </span>
  );
};

export default HomeSix;
