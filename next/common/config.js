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
    url: process.env.NOW_URL ? process.env.NOW_URL : "http://localhost:3000",
    port: 3000
  },

  api: {
    url: process.env.NOW_URL
      ? `${process.env.NOW_URL}/api`
      : "http://localhost:3000/api",
    port: 3000
  },

  cacheDuration: "2 hours"
};

export default config;
