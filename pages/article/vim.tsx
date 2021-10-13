import { Article } from "../../articles/2017-12-17--vim";
import articleMetadata from "../../articles/2017-12-17--vim/metadata.json";
import { LayoutArticle } from "../../src/components/layout/layout-article";

const ArticlePage = () => <LayoutArticle articleMetadata={articleMetadata} article={Article} />;

export default ArticlePage;
