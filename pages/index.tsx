import { NextPage } from "next";
import Link from "next/link";

import { getArticlesMetadata } from "../src/articles";
import { ArticleMetadata } from "../src/articles/types";
import { config, getServerRuntimeConfig, routes } from "../src/config";
import { generateRssFeed } from "../src/domains/rss";

type Props = {
  articles: ArticleMetadata[];
};

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const serverConfig = getServerRuntimeConfig();
  const articlesMetadata = await getArticlesMetadata(serverConfig.paths.articles);

  if (config.isProduction || config.app.generateRssInDev) {
    await generateRssFeed(articlesMetadata, serverConfig.paths.public);
  }

  return {
    props: {
      articles: articlesMetadata,
    },
  };
};

const Home: NextPage<Props> = (props) => {
  return (
    <div>
      <main>
        <h1>title</h1>

        <h2>Articles</h2>
        <ul>
          {props.articles.map((article) => (
            <li key={article.articleDirectory}>
              <Link href={routes.article(article.slug)}>
                <a>{article.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
