import { Article } from "../../articles/2019-08-08--squash-commits";
import articleMetadata from "../../articles/2019-08-08--squash-commits/metadata.json";
import { LayoutArticle } from "../../src/components/layout/layout-article";

const ArticlePage = () => <LayoutArticle articleMetadata={articleMetadata} article={Article} />;

export default ArticlePage;
