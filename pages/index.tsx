import dayjs from "dayjs";
import { NextPage } from "next";
import { groupBy, map, pipe, reverse, sortBy, toPairs } from "ramda";

import { articlesTwitterRaw } from "../articles/twitter-threads";
import { parseArticleTwitterRaw } from "../src/articles/articles";
import { getArticlesBlog } from "../src/articles/articles-server";
import { ArticleBlogVisible, ArticlePublished, ArticleTwitter } from "../src/articles/types";
import { Link } from "../src/components";
import { config, getServerRuntimeConfig, routes } from "../src/config";
import image from "../src/me.jpg";
import { generateRssFeed } from "../src/services/rss";
import { gridCss, gridNumber, sizeCss } from "../src/styles";

type ArticlesGroup = {
  year: number;
  articles: ArticlePublished[];
};

type Props = {
  articles: ArticlesGroup[];
};

const profileImageSize = gridNumber(11);

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
          I am software engineer working at{" "}
          <Link href="https://www.alicetechnologies.com" newTab>
            ALICE Technologies
          </Link>{" "}
          teacher at{" "}
          <Link href="https://www.cvut.cz/en" newTab>
            Czech Technical University
          </Link>{" "}
          and small investor. Previously I worked at{" "}
          <Link href="https://www.seznam.cz/" newTab>
            Seznam.cz
          </Link>{" "}
          and I also did bunch of{" "}
          <Link href={config.author.github} newTab>
            open source
          </Link>{" "}
          work.
        </p>
        <p>I like programming, economics, rock climbing and much more :)</p>
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
        <Link href={config.author.github} newTab>
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
          <span className="monospace">{year}</span>
          <ul>
            {articles.map((article) => {
              switch (article.type) {
                case "ARTICLE_BLOG_VISIBLE":
                  return (
                    <li key={article.articleDirectory}>
                      <span className="monospace">{dayjs.utc(article.datePublication).format("MMM DD")} </span>
                      <Link href={routes.article(article.slug)}>{article.title}</Link>
                    </li>
                  );

                case "ARTICLE_TWITTER":
                  return (
                    <li key={article.link}>
                      <span className="monospace">{dayjs.utc(article.datePublication).format("MMM DD")} </span>
                      <Link href={article.link} newTab>
                        {article.title}
                      </Link>
                    </li>
                  );

                default:
                  return null;
              }
            })}
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
        overflow: hidden;
        width: ${sizeCss(profileImageSize)};
        height: ${sizeCss(profileImageSize)};
        flex-shrink: 0;
      }

      .profile-text {
        flex-grow: 1;
        padding-left: ${gridCss(1)};
      }

      .profile-text p:last-of-type {
        margin-bottom: 0;
      }

      .monospace {
        font-family: monospace;
        font-size: 14px;
      }

      ul {
        padding-left: ${gridCss(3)};
      }
    `}</style>
  </>
);

export default Home;
