import fs from "fs/promises";
import { NextPage } from "next";
import getConfig from "next/config";
import path from "path";

const { serverRuntimeConfig } = getConfig();

type Props = {
  articles: string[];
};

export const getStaticProps = async (): Promise<{ props: Props }> => {
  // Workaround for https://github.com/vercel/next.js/issues/8251
  const res = await fs.readdir(path.join(serverRuntimeConfig.PROJECT_ROOT, "./articles"));

  return {
    props: {
      articles: res,
    },
  };
};

const Home: NextPage<Props> = (props) => {
  return (
    <div>
      <main>
        <h1>title</h1>

        <p>
          Get started by editing <code>pages/index.js</code>
        </p>

        {props.articles.map((a) => JSON.stringify(a))}
      </main>
    </div>
  );
};

export default Home;
