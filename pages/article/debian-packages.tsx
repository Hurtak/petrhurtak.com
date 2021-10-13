import { Article } from "../../articles/2017-05-21--debian-packages";
import articleMetadata from "../../articles/2017-05-21--debian-packages/metadata.json";
import { LayoutArticle } from "../../src/components/layout/layout-article";

const ArticlePage = () => <LayoutArticle articleMetadata={articleMetadata} article={Article} />;

export default ArticlePage;
