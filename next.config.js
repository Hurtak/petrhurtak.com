const path = require("path");
const withVideos = require("next-videos");

const projectRoot = __dirname;

/**
 * @type {import('next').NextConfig}
 */
const config = {
  // Workaround for https://github.com/vercel/next.js/issues/8251
  serverRuntimeConfig: {
    paths: {
      project: projectRoot,
      articles: path.join(projectRoot, "articles"),
      public: path.join(projectRoot, "public"),
    },
  },
};

module.exports = withVideos(config);
