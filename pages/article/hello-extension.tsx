import { Article } from "../../articles/2019-08-25--hello-extension";
import articleMetadata from "../../articles/2019-08-25--hello-extension/metadata.json";
import { LayoutArticle } from "../../src/components/layout/layout-article";

const ArticlePage = () => <LayoutArticle articleMetadata={articleMetadata} article={Article} />;

export default ArticlePage;
