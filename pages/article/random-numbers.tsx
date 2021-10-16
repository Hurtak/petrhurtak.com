import { Article } from "../../articles/2017-07-17--random-numbers";
import { articlePage } from "../../src/domains/article";
import { getStaticPropsArticle } from "../../src/domains/article-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);

export default articlePage(Article);
