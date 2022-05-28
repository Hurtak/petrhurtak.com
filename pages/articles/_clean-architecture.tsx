import { Article } from "../../articles/_2022-05-23--clean-architecture";
import { articlePage } from "../../src/articles/articles-client";
import { getStaticPropsArticle } from "../../src/articles/articles-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);

export default articlePage(Article);
