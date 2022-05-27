import dayjs from "dayjs";
import { NextPage } from "next";
import { groupBy, map, pipe, reverse, sortBy, toPairs } from "ramda";

import { articlesTwitterRaw } from "../articles/twitter-threads";
import { parseArticleTwitterRaw } from "../src/articles/articles";
import { getArticlesBlog } from "../src/articles/articles-server";
import { ArticleBlogVisible, ArticlePublished } from "../src/articles/types";
import { Link } from "../src/components/article";
import { config, getServerRuntimeConfig, routes } from "../src/config";
import image from "../src/me.jpg";
import { generateRssFeed } from "../src/services/rss";
import { gridCss, gridNumber, pxCss, sizeCss } from "../src/styles";

type ArticlesGroup = {
  year: number;
  articles: ArticlePublished[];
};

type Props = {
  articles: ArticlesGroup[];
};

const profileImageSize = gridNumber(14);

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const serverConfig = getServerRuntimeConfig();
  const articlesBlog = await getArticlesBlog(serverConfig.paths.articles);
  const articlesBlogVisible: ArticleBlogVisible[] = [];
  for (const article of articlesBlog) {
    if (article.type === "ARTICLE_BLOG_VISIBLE") articlesBlogVisible.push(article);
  }

  if (config.isProduction || config.app.generateRssInDev) {
    await generateRssFeed(articlesBlogVisible, serverConfig.paths.public);
  }

  const articlesTwitter = articlesTwitterRaw.map(parseArticleTwitterRaw);
  const articlesList: ArticlePublished[] = [...articlesBlogVisible, ...articlesTwitter];

  const articles: ArticlesGroup[] = pipe(
    groupBy((a: ArticlePublished) => new Date(a.datePublication).getFullYear().toString()),
    toPairs,
    map(
      ([year, articles]: [string, ArticlePublished[]]): ArticlesGroup => ({
        year: Number(year),
        articles: pipe(
          sortBy((a) => a.datePublication),
          (a: ArticlePublished[]) => reverse(a)
        )(articles),
      })
    ),
    sortBy((g) => g.year),
    (g) => reverse(g)
  )(articlesList);

  return {
    props: {
      articles,
    },
  };
};

const Home: NextPage<Props> = (props) => (
  <>
    <h1>Hey, I&apos;m Petr</h1>

    <div className="profile">
      <div className="profile-image">
        <img
          src={image.src}
          width={profileImageSize}
          height={profileImageSize}
          alt={`${config.author.fullName}'s profile picture`}
        />
      </div>

      <div className="profile-text">
        <p>
          I am an engineer with a focus on full-stack TypeScript web app development. I teach students how to create web
          apps at{" "}
          <Link href="https://www.cvut.cz/en" newTab>
            Czech Technical University
          </Link>
          .
        </p>

        <p>
          In my free time, I like to contribute to open-source on{" "}
          <Link href={config.author.gitHub} newTab>
            GitHub
          </Link>
          , write articles on this blog, rant on{" "}
          <Link href={config.author.twitter} newTab>
            Twitter
          </Link>
          , do rock climbing, or read about economics and investing.
        </p>
      </div>
    </div>

    <h2>Links</h2>
    <ul>
      <li>
        <Link href={`mailto:${config.author.email}`}>Email</Link>
      </li>
      <li>
        <Link href={config.author.twitter} newTab>
          Twitter
        </Link>
      </li>
      <li>
        <Link href={config.author.gitHub} newTab>
          GitHub
        </Link>
      </li>
      <li>
        <Link href={config.author.linkedIn} newTab>
          LinkedIn
        </Link>
      </li>
      <li>
        <Link href={config.author.instagram} newTab>
          Instagram
        </Link>
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
      case "ARTICLE_BLOG_VISIBLE":
        return routes.article(article.slug);
      case "ARTICLE_TWITTER":
        return article.link;
    }
  })();

  const abbr = (() => {
    switch (article.type) {
      case "ARTICLE_BLOG_VISIBLE":
        return { title: "Blog article", abbr: "A" };
      case "ARTICLE_TWITTER":
        return { title: "Twitter thread", abbr: "T" };
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

      <Link href={href} newTab={article.type === "ARTICLE_TWITTER"} className="article-link">
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
