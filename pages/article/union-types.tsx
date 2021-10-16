import { Article } from "../../articles/2019-09-03--union-types";
import { articlePage } from "../../src/domains/article";
import { getStaticPropsArticle } from "../../src/domains/article-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);

export default articlePage(Article);
