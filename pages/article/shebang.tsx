import { Article } from "../../articles/2017-04-28--shebang";
import articleMetadata from "../../articles/2017-04-28--shebang/metadata.json";
import { LayoutArticle } from "../../src/components/layout/layout-article";

const ArticlePage = () => <LayoutArticle articleMetadata={articleMetadata} article={Article} />;

export default ArticlePage;
