const path = require("node:path");
const { execSync } = require("node:child_process");
const withVideos = require("next-videos");

const projectRoot = __dirname;

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,

  experimental: {
    // TODO: remove these once they become stable
    scrollRestoration: true,
  },

  serverRuntimeConfig: {
    // Workaround for https://github.com/vercel/next.js/issues/8251
    paths: {
      project: projectRoot,
      articles: path.join(projectRoot, "articles"),
      public: path.join(projectRoot, "public"),
    },
    buildInfo: {
      time: Date.now(),
      commitHash: execSync("git rev-parse HEAD").toString().trim(),
    },
  },

  typescript: {
    tsconfigPath: "tsconfig.next.json",
  },
};

module.exports = withVideos(config);
