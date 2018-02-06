import fs from "fs-extra";
import path from "path";

const pathArticles = path.join(__dirname, "../../articles");

async function getPosts() {
  let articlesList = await fs.readdir(pathArticles);
  articlesList = articlesList.map(articleFolder =>
    path.join(pathArticles, articleFolder)
  );
  articlesList = articlesList.map(fullPathFolder =>
    path.join(fullPathFolder, "article.js")
  );
  articlesList = articlesList.map(articleFilePath => require(articleFilePath));
  // articlesList = articlesList.map(article => article.metadata);

  console.log(articlesList);

  return articlesList;
}

module.exports = getPosts;
