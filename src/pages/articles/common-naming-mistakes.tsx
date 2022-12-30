import { Article } from "../../../articles/2017-08-24--common-naming-mistakes";
import { articlePage } from "../../articles/articles-client";
import { getStaticPropsArticle } from "../../articles/articles-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);
export default articlePage(Article);
