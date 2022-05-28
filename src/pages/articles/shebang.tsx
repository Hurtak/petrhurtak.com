import { Article } from "../../../articles/2017-04-28--shebang";
import { articlePage } from "../../articles/articles-client";
import { getStaticPropsArticle } from "../../articles/articles-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);

export default articlePage(Article);
