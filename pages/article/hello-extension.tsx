import { Article } from "../../articles/2019-08-25--hello-extension";
import { articlePage } from "../../src/domains/article";
import { getStaticPropsArticle } from "../../src/domains/article-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);

export default articlePage(Article);
