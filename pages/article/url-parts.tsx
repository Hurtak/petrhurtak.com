import { Article } from "../../articles/2021-10-11--url-parts";
import articleMetadata from "../../articles/2021-10-11--url-parts/metadata.json";
import { LayoutArticle } from "../../src/components/layout/layout-article";

const ArticlePage = () => <LayoutArticle articleMetadata={articleMetadata} article={Article} />;

export default ArticlePage;
