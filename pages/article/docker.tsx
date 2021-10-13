import { Article } from "../../articles/2020-09-21--docker";
import articleMetadata from "../../articles/2020-09-21--docker/metadata.json";
import { LayoutArticle } from "../../src/components/layout/layout-article";

const ArticlePage = () => <LayoutArticle articleMetadata={articleMetadata} article={Article} />;

export default ArticlePage;
