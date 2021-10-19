import dayjs from "dayjs";
import { NextPage } from "next";
import { filter, groupBy, map, pipe, reverse, sortBy, toPairs } from "ramda";

import { getArticlesMetadata } from "../src/articles/articles-server";
import { ArticleMetadata } from "../src/articles/types";
import { Link } from "../src/components";
import { config, getServerRuntimeConfig, routes } from "../src/config";
import image from "../src/me.jpg";
import { generateRssFeed } from "../src/services/rss";
import { gridCss, gridNumber, sizeCss } from "../src/styles";

type ArticlesGroup = {
  year: number;
  articles: ArticleMetadata[];
};

type Props = {
  articles: ArticlesGroup[];
};

const profileImageSize = gridNumber(11);

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const serverConfig = getServerRuntimeConfig();
  const articlesMetadata = await getArticlesMetadata(serverConfig.paths.articles);

  if (config.isProduction || config.app.generateRssInDev) {
    const articlesRss = articlesMetadata.filter((a) => a.type !== "ARTICLE_HIDDEN");
    await generateRssFeed(articlesRss, serverConfig.paths.public);
  }

  const articles: ArticlesGroup[] = pipe(
    (articles: ArticleMetadata[]) => filter((a) => a.type !== "ARTICLE_HIDDEN", articles),
    groupBy((a: ArticleMetadata) => new Date(a.datePublication).getFullYear().toString()),
    toPairs,
    map(
      ([year, articles]: [string, ArticleMetadata[]]): ArticlesGroup => ({
        year: Number(year),
        articles: pipe(
          sortBy((a: ArticleMetadata) => a.datePublication),
          (a: ArticleMetadata[]) => reverse<ArticleMetadata>(a)
        )(articles),
      })
    ),
    sortBy((g: ArticlesGroup) => g.year),
    (g: ArticlesGroup[]) => reverse<ArticlesGroup>(g)
  )(articlesMetadata);

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
          <div>{year}</div>
          <ul>
            {articles.map((article) => (
              <li key={article.articleDirectory}>
                {dayjs(article.datePublication).format("YYYY-MM-DD")}{" "}
                <Link href={routes.article(article.slug)}>{article.title}</Link>
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

      ul {
        padding-left: ${gridCss(3)};
      }
    `}</style>
  </>
);

export default Home;
