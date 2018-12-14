module.exports = {
  //
  // Backend config
  //
  dev: process.env.NODE_ENV !== "production",

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
  // OTHER
  //

  pathPrefix: "/", // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: "Minimal Blog", // Navigation and Site Title
  siteTitleAlt: "Minimal Blog - Gatsby Starter", // Alternative Site title for SEO
  siteLanguage: "en", // Language Tag on <html> element
  siteBanner: "/social/banner.jpg", // Your image for og:image tag. You can find it in the /static folder
  favicon: "src/favicon.png", // Your image for favicons. You can find it in the /src folder
  siteDescription: "Minimal Blog with big typography", // Your site description
  author: "LekoArts", // Author for schemaORGJSONLD
  siteLogo: "/social/logo.png", // Image for schemaORGJSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: "@minimal", // Twitter Username - Optional
  ogSiteName: "minimal", // Facebook Site Name - Optional
  ogLanguage: "en_US", // Facebook Language

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: "#3498DB",
  backgroundColor: "#2b2e3c",

  // Settings for typography.js
  headerFontFamily: "Bitter",
  bodyFontFamily: "Open Sans",
  baseFontSize: "18px"
};
