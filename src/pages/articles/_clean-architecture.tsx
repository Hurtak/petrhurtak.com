import { Article } from "../../../articles/_2022-05-23--clean-architecture";
import { articlePage } from "../../articles/articles-client";
import { getStaticPropsArticle } from "../../articles/articles-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);

export default articlePage(Article);
