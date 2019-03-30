import * as fs from "fs";
import * as path from "path";
import { camelCase, capitalize } from "lodash";
import { generateSourceFile } from "./lib/generate-file";

type ArticleType = "drafts" | "published";

type ArticleData = {
  variable: string;
  path: string;
};

function getArticlesByType(type: ArticleType): ArticleData[] {
  const articles = [];

  const articlesFolderPath = path.join(__dirname, `../../src/articles/${type}`);
  const articleFolderItems = fs.readdirSync(articlesFolderPath);

  for (const item of articleFolderItems) {
    const articleFolderPath = path.join(articlesFolderPath, item);
    const stat = fs.lstatSync(articleFolderPath);
    if (stat.isDirectory() === false) continue;

    const requiredFiles = ["article.jsx", "metadata.ts"];
    const requiredFilesPreset = requiredFiles.every(fileName =>
      fs.existsSync(path.join(articleFolderPath, fileName))
    );
    if (!requiredFilesPreset) continue;

    let variable = item;
    variable = variable.replace(/^_/, "");
    variable = variable.replace(/^[\d-]+?--/, "");
    variable = camelCase(variable);
    variable = `article_${variable}`;

    articles.push({
      variable,
      path: path.join(`../articles/${type}`, item, "metadata")
    });
  }

  return articles;
}

const articleCategories: {
  category: ArticleType;
  data: ArticleData[];
}[] = [
  { category: "drafts", data: getArticlesByType("drafts") },
  { category: "published", data: getArticlesByType("published") }
];

const articleImports = articleCategories
  .map(({ data }) =>
    data
      .map(({ variable, path }) => `import ${variable} from "${path}";`)
      .join("\n")
  )
  .join("\n\n");

const articleExports = articleCategories
  .map(
    ({ category, data }) =>
      `export const articles${capitalize(category)} = [
      ${data.map(article => article.variable).join(",")}
    ]`
  )
  .join("\n\n");

const res = `
${articleImports}

${articleExports}
`;

generateSourceFile(res, "articles-list.ts");
