import { Article } from "../../../articles/2019-05-13--switch-node-version";
import { articlePage } from "../../articles/articles-client";
import { getStaticPropsArticle } from "../../articles/articles-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);
export default articlePage(Article);
