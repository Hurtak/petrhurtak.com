import { Article } from "../../../articles/_2022-02-04--common-sw-architecture-mistakes";
import { articlePage } from "../../articles/articles-client";
import { getStaticPropsArticle } from "../../articles/articles-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);

export default articlePage(Article);
