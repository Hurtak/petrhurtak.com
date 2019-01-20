import * as fs from "fs";
import * as path from "path";
import { generateSourceFile } from "./lib/generate-file";

const highlightCss = fs.readFileSync(
  path.join(__dirname, "../../node_modules/highlight.js/styles/github.css"),
  "utf8"
);

const normalizeCss = fs.readFileSync(
  path.join(__dirname, "../../node_modules/normalize.css/normalize.css"),
  "utf8"
);

const res = `
export const highlightCss = \`${escapeBacktick(cleanupCss(highlightCss))}\`;
export const normalizeCss = \`${escapeBacktick(cleanupCss(normalizeCss))}\`;
`;

generateSourceFile(res, "raw-files.ts");

function cleanupCss(input: string): string {
  return input
    .replace(/\/\*(.|\n)*?\*\//gm, "") // remove comments
    .replace(/\s+/gm, " ") // reduce whitespace
    .trim();
}

function escapeBacktick(input: string): string {
  return input.replace(/[`]/gm, "\\`");
}
