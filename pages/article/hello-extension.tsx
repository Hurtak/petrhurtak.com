import { Article } from "../../articles/2019-08-25--hello-extension";
import { articlePage } from "../../src/articles/articles-client";
import { getStaticPropsArticle } from "../../src/articles/articles-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);

export default articlePage(Article);
