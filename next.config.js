/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  output: "export",
  distDir: "dist",
  reactStrictMode: true,

  experimental: {
    // TODO: remove these once they become stable
    scrollRestoration: true,
  },

  turbopack: {
    root: __dirname,
    rules: {
      "*.mp4": {
        type: "asset",
      },
    },
  },
};
