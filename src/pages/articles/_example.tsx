import { Article } from "../../../articles/_2020-10-20--example";
import { articlePage } from "../../articles/articles-client";
import { getStaticPropsArticle } from "../../articles/articles-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);

export default articlePage(Article);
