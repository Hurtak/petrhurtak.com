import { Article } from "../../../../articles/_hidden/example";
import articleMetadata from "../../../../articles/_hidden/example/metadata.json";
import { LayoutArticle } from "../../../../src/components/layout/layout-article";

const ArticlePage = () => <LayoutArticle articleMetadata={articleMetadata} article={Article} />;

export default ArticlePage;
