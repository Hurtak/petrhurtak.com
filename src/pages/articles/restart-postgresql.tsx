import { Article } from "../../../articles/2020-06-22--restart-postgresql";
import { articlePage } from "../../articles/articles-client";
import { getStaticPropsArticle } from "../../articles/articles-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);
export default articlePage(Article);
