const config = {
  //
  // Blog settings
  //
  articles: {
    perPage: 10,
    perRssFeed: 20
  },

  //
  // Template config
  //
  siteUrl: "https://www.hurtak.cc",
  siteUrlShort: "hurtak.cc",

  yearFound: 2015,
  yearCurrent: new Date().getFullYear(),

  //
  // Backend URLs config
  //
  server: {
    url: "http://localhost:3000",
    port: 3000
  },

  api: {
    url: "http://localhost:3000/api",
    port: 3000
  }
};

export default config;
