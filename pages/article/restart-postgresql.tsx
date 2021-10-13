import { Article } from "../../articles/2020-06-22--restart-postgresql";
import articleMetadata from "../../articles/2020-06-22--restart-postgresql/metadata.json";
import { LayoutArticle } from "../../src/components/layout/layout-article";

const ArticlePage = () => <LayoutArticle articleMetadata={articleMetadata} article={Article} />;

export default ArticlePage;
