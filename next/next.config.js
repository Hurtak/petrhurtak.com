import withSourceMaps from "@zeit/next-source-maps";

const nowUrl = process.env.NOW_URL;

const config = {
  publicRuntimeConfig: {
    //
    // Backend config
    //
    dev: process.env.NODE_ENV !== "production",
    nowUrl: nowUrl,
    api: nowUrl ? `${nowUrl}/api` : "http://localhost:3000/api",

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
    port: 3000,

    cacheDuration: "2 hours"
  }
};

let configWithPlugins = config;
configWithPlugins = withSourceMaps(configWithPlugins);

export default configWithPlugins;
