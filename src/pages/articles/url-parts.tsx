import { Article } from "../../../articles/2021-10-11--url-parts";
import { articlePage } from "../../articles/articles-client";
import { getStaticPropsArticle } from "../../articles/articles-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);
export default articlePage(Article);
