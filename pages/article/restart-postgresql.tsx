import { Article } from "../../articles/2020-06-22--restart-postgresql";
import { articlePage } from "../../src/domains/article";
import { getStaticPropsArticle } from "../../src/domains/article-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);

export default articlePage(Article);
