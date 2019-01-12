export default {
  index: "/",

  hidden: "/hello/",
  buildInformation: "/hello/build-information/",
  allArticles: "/hello/articles/",
  hiddenArticle: {
    matcher: "/hello/articles/:slug/",
    url: (article: string) => `/hello/articles/${article}/`
  },

  article: {
    matcher: "/:slug/",
    url: (article: string) => `/${article}/`
  },

  rss: "/rss"
};
