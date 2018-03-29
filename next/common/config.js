import nextConfig from "../next.config.js";

const nowUrl = nextConfig.publicRuntimeConfig.nowUrl;

const config = {
  dev: nextConfig.publicRuntimeConfig.dev,

  //
  // Blog settings
  //
  articles: {
    perPage: 10,
    perRssFeed: 20
  },

  //
  // Template values
  //
  siteUrl: "https://www.hurtak.cc",
  siteUrlShort: "hurtak.cc",

  yearFound: 2015,
  yearCurrent: new Date().getFullYear(),

  //
  // Backend URLs config
  //
  server: {
    url: nowUrl ? nowUrl : "http://localhost:3000",
    port: 3000
  },

  api: {
    url: nowUrl ? `${nowUrl}/api` : "http://localhost:3000/api",
    port: 3000
  },

  cacheDuration: "2 hours"
};

export default config;
