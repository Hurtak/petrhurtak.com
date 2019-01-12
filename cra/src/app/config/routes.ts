export default {
  index: "/",

  hidden: "/hello/",
  buildInformation: "/hello/build-information/",
  allArticles: "/hello/articles/",
  hiddenArticle: {
    matcher: "/hello/articles/:articleUrl/",
    url: (article: string) => `/hello/articles/${article}/`
  },

  article: {
    matcher: "/:articleUrl/",
    url: (article: string) => `/${article}/`
  },

  rss: "/rss"
};
