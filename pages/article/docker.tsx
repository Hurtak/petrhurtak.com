import { Article } from "../../articles/2020-09-21--docker";
import { articlePage } from "../../src/articles/articles-client";
import { getStaticPropsArticle } from "../../src/articles/articles-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);

export default articlePage(Article);
