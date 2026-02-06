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

const HomeFifteen: NextPage<Props> = (props) => (
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
      @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Figtree:wght@400;500&family=Inconsolata:wght@400;500&display=swap");

      :root {
        --bg: #ffffff;
        --ink: #111827;
        --muted: #6b7280;
        --link: #7c2d12;
        --serif: "Playfair Display", serif;
        --sans: "Figtree", sans-serif;
        --mono: "Inconsolata", monospace;
      }

      body {
        background: var(--bg);
        color: var(--ink);
        font-family: var(--sans);
        font-size: 15.5px;
        line-height: 1.78;
      }

      :global(a.link),
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
        margin: 0 0 ${gridCss(1.25)} 0;
        font-family: var(--serif);
        font-size: 37px;
        font-weight: 700;
        line-height: 1.16;
      }

      h2 {
        margin: 0 0 ${gridCss(1.25)} 0;
        font-family: var(--mono);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--muted);
      }

      ul + h2 {
        margin-top: ${gridCss(2.25)};
      }

      p,
      li {
        font-family: var(--sans);
        font-size: 15.5px;
        line-height: 1.78;
      }

      .profile {
        display: flex;
        flex-direction: row;
        margin-bottom: ${gridCss(2.25)};
      }

      .profile-image {
        display: inline-block;
        flex-shrink: 0;
        width: ${sizeCss(profileImageSize)};
        height: ${sizeCss(profileImageSize)};
        margin-top: ${pxCss(3)};
        padding: ${gridCss(0.375)};
        border: 1px solid rgba(17, 24, 39, 0.16);
        border-radius: ${gridCss(1)};
        background: #f9fafb;
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.92);
      }

      .profile-image img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: ${gridCss(0.625)};
        object-fit: cover;
      }

      .profile-text {
        flex-grow: 1;
        padding-left: ${gridCss(1.25)};
      }

      .profile-text p {
        margin: 0;
      }
      .profile-text p:not(:first-child) {
        margin-top: 0.76em;
      }

      ul {
        padding-left: ${gridCss(3)};
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      ul .year {
        display: inline-block;
        margin-bottom: ${gridCss(1)};
        font-family: var(--mono);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.2em;
        color: var(--muted);
      }
      ul li:not(:first-child) .year {
        margin-top: ${gridCss(1.25)};
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
          font-size: 15.5px;
          line-height: 1.78;
        }
        .article .article-meta {
          flex-shrink: 0;
          margin-right: 6px;
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: var(--muted);
        }
        .article .article-meta .abbr {
          font-weight: 500;
        }
        .article .article-meta .sep {
          letter-spacing: -4px;
          padding-right: 4px;
        }
        .article .article-link {
          flex-shrink: 0;
          font-family: var(--serif);
          font-weight: 500;
        }
      `}</style>
    </span>
  );
};

export default HomeFifteen;
