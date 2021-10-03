import fs from "fs/promises";
import { NextPage } from "next";
import getConfig from "next/config";
import Link from "next/link";
import path from "path";

import generateRssFeed from "../src/rss";

type Props = {
  articles: string[];
};

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const { serverRuntimeConfig } = getConfig();
  const articlesDir = path.join(serverRuntimeConfig.paths.project, "./pages/article");
  const articlesList = await fs.readdir(articlesDir);
  const articles = articlesList.filter((a) => !a.startsWith("_")).map((a) => a.replace(/\.tsx$/, ""));

  return {
    props: {
      articles,
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
            <li key={article}>
              <Link href={`/article/${article}`}>
                <a>{article}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
