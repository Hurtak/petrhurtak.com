import * as fs from "fs";
import * as path from "path";
import * as prettier from "prettier";

export function generateSourceFile(tsString: string, fileName: string) {
  tsString = prettier.format(tsString, { parser: "babylon" });

  fs.writeFileSync(
    path.join(__dirname, "../../src/generated", fileName),
    tsString,
    "utf8"
  );
}

export function generateStaticFile(fileContent: string, fileName: string) {
  fs.writeFileSync(
    path.join(__dirname, "../../public/", fileName),
    fileContent,
    "utf8"
  );
}
