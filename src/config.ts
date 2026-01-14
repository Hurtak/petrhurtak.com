const isProduction = import.meta.env?.PROD ?? process.env.NODE_ENV === "production";

export const config = {
  isProduction,
  isDev: !isProduction,

  site: {
    domain: "petrhurtak.com",
    domainWithProtocol: "https://petrhurtak.com",
    documentTitle: "petrhurtak.com",
    yearFounded: 2015,
    gitHub: "https://github.com/hurtak/petrhurtak.com",
  },
  author: {
    fullName: "Petr Hurtak",
    email: "petr.hurtak@gmail.com",

    gitHub: "https://github.com/hurtak",
    x: "https://x.com/PetrHurtak",
    linkedIn: "https://www.linkedin.com/in/hurtak/",
    instagram: "https://www.instagram.com/petr.hurtak/",
  },
  app: {
    generateRssInDev: false,
  },
  tokens: {
    googleAnalytics: "G-G6MF6HM86N",
  },
} as const;

export const routes = {
  // Helpers
  absolute: (relative: string) => `${config.site.domainWithProtocol}${relative}`,

  // App routes
  root: "/",
  article: (slug: string) => `/articles/${slug}`,

  // App static files
  favicon: `/favicon.svg`,
  rss: {
    root: "/rss",
    rss2: "/rss/feed.xml",
    atom: "/rss/atom.xml",
    jsonFeed: "/rss/feed.json",
  },

  // Outside of the app
  articleXSearch: (slug: string) =>
    `https://x.com/search?q=${encodeURIComponent(routes.absolute(routes.article(slug)))}`,
  articleGitHubLink: (articleDirectory: string) =>
    `${config.site.gitHub}/tree/main/articles/${encodeURIComponent(articleDirectory)}/index.tsx`,
  articleGitHubCommitHash: (commitHash: string) => `${config.site.gitHub}/commit/${encodeURIComponent(commitHash)}`,
} as const;
