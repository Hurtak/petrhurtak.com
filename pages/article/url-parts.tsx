import { Article } from "../../articles/2021-10-11--url-parts";
import { articlePage } from "../../src/domains/article";
import { getStaticPropsArticle } from "../../src/domains/article-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);

export default articlePage(Article);
