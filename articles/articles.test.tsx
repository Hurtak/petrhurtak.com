import * as fs from "fs/promises";
import * as path from "path";

describe("articles", () => {
  test("folder name matches pattern", async () => {
    const articlesDir = __dirname;
    const dirItems = await fs.readdir(articlesDir);

    const articles: Array<string> = [];
    for (const item of dirItems) {
      const lstat = await fs.lstat(path.join(articlesDir, item));
      const isDir = lstat.isDirectory();
      if (isDir && !item.startsWith("_")) {
        articles.push(item);
      }
    }

    for (const articleFolderName of articles) {
      expect(articleFolderName).toMatch(/^\d{4}-\d{2}-\d{2}--[\w-]+?$/);
    }
  });
});
