import dayjs from "dayjs";
import { NextPage } from "next";
import { __, groupBy, map, pipe, reverse, sortBy, toPairs } from "ramda";

import { getArticlesMetadata } from "../src/articles";
import { ArticleMetadata } from "../src/articles/types";
import { Link } from "../src/components";
import { config, getServerRuntimeConfig, routes } from "../src/config";
import { generateRssFeed } from "../src/domains/rss";

type ArticlesGroup = {
  year: number;
  articles: ArticleMetadata[];
};

type Props = {
  articles: ArticlesGroup[];
};

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const serverConfig = getServerRuntimeConfig();
  const articlesMetadata = await getArticlesMetadata(serverConfig.paths.articles);

  if (config.isProduction || config.app.generateRssInDev) {
    await generateRssFeed(articlesMetadata, serverConfig.paths.public);
  }

  const articles: (articles: ArticleMetadata[]) => ArticlesGroup[] = pipe(
    groupBy((a: ArticleMetadata) => new Date(a.datePublication).getFullYear().toString()),
    toPairs,
    map(([year, articles]: [string, ArticleMetadata[]]) => ({
      year: Number(year),
      articles: pipe(
        sortBy((a: ArticleMetadata) => a.datePublication),
        (a: ArticleMetadata[]) => reverse<ArticleMetadata>(a)
      )(articles),
    })),
    sortBy((g: ArticlesGroup) => g.year),
    (g: ArticlesGroup[]) => reverse<ArticlesGroup>(g)
  );

  return {
    props: {
      articles: articles(articlesMetadata),
    },
  };
};

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <h1>Hey, I&apos;m Petr</h1>

      <h2>Links</h2>
      <ul>
        <li>
          <Link href={`mailto:${config.author.email}`}>
            <a>Email</a>
          </Link>
        </li>
        <li>
          <Link href={config.author.twitter}>
            <a>Twitter</a>
          </Link>
        </li>
        <li>
          <Link href={config.author.github}>
            <a>GitHub</a>
          </Link>
        </li>
        <li>
          <Link href={config.author.linkedIn}>
            <a>LinkedIn</a>
          </Link>
        </li>
        <li>
          <Link href={config.author.linkedIn}>
            <a>Instagram</a>
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
                  <Link href={routes.article(article.slug)}>
                    <a>{article.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
