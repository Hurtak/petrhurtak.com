import { Article } from "../../articles/2017-07-17--random-numbers";
import articleMetadata from "../../articles/2017-07-17--random-numbers/metadata.json";
import { LayoutArticle } from "../../src/components/layout/layout-article";

const ArticlePage = () => <LayoutArticle articleMetadata={articleMetadata} article={Article} />;

export default ArticlePage;
