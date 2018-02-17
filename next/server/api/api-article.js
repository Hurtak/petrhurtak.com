import * as apiCommon from "./api-common.js";

export default async function getPost(articleUrl) {
  const articles = await apiCommon.getArticlesMetadata();

  const article = articles.find(article => article.url === articleUrl);
  if (!article) {
    return null;
  }

  return article;
}
