import { execSync } from "child_process";
import { generateSourceFile } from "./lib/generate-file";

const now = new Date();

const buildGitCommitHash = execSync("git rev-parse HEAD")
  .toString()
  .trim();
const buildTimestamp = now.getTime();
const buildTime = now.toLocaleString("cs");

const res = `
export default {
  buildGitCommitHash: "${buildGitCommitHash}",
  buildTimestamp: ${buildTimestamp},
  buildTime: "${buildTime}",
}
`;

generateSourceFile(res, "build-info.ts");
