/** @type {import('next').NextConfig} */
const withVideos = require("next-videos");

const config = {
  reactStrictMode: true,

  // Workaround for https://github.com/vercel/next.js/issues/8251
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};

module.exports = withVideos(config);
