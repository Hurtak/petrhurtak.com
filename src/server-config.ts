import { execSync } from "node:child_process";
import path from "node:path";

const projectRoot = process.cwd();

const getCommitHash = (): string => {
  const commitHash = process.env.VERCEL_GIT_COMMIT_SHA;
  if (commitHash) return commitHash;

  try {
    return execSync("git rev-parse HEAD", { cwd: projectRoot, encoding: "utf8" }).trim() || "unknown";
  } catch {
    return "unknown";
  }
};

export type ServerConfig = {
  paths: {
    project: string;
    articles: string;
    public: string;
  };
  buildInfo: {
    time: number;
    commitHash: string;
  };
};

const serverConfig: ServerConfig = {
  paths: {
    project: projectRoot,
    articles: path.join(projectRoot, "articles"),
    public: path.join(projectRoot, "public"),
  },
  buildInfo: {
    time: Date.now(),
    commitHash: getCommitHash(),
  },
};

export const getServerConfig = (): ServerConfig => serverConfig;
