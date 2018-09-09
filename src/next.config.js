const nowUrl = process.env.NOW_URL;
const dev = process.env.NODE_ENV !== "production";
const serverPort = 3000;

const config = {
  publicRuntimeConfig: {
    //
    // Backend config
    //
    dev: dev,

    origin: nowUrl ? nowUrl : `http://localhost:${serverPort}`,
    apiPath: "/api",

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
    yearCurrent: new Date().getFullYear()
  },

  serverRuntimeConfig: {
    port: serverPort,

    cacheDuration: "2 hours"
  }
};

module.exports = config;
