import { Article } from "../../articles/2019-09-03--union-types";
import articleMetadata from "../../articles/2019-09-03--union-types/metadata.json";
import { LayoutArticle } from "../../src/components/layout/layout-article";

const ArticlePage = () => <LayoutArticle articleMetadata={articleMetadata} article={Article} />;

export default ArticlePage;
