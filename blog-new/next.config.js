/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  // Workaround for https://github.com/vercel/next.js/issues/8251
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};
