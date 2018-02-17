const config = {
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
    url: "http://localhost:3000",
    port: 3000
  },

  api: {
    url: "http://localhost:3000/api",
    port: 3000
  },

  cacheDuration: "2 hours"
};

export default config;
