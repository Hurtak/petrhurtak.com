import { Article } from "../../articles/2017-05-21--debian-packages";
import { articlePage } from "../../src/articles/articles-client";
import { getStaticPropsArticle } from "../../src/articles/articles-server";

export const getStaticProps = () => getStaticPropsArticle(__filename);

export default articlePage(Article);
