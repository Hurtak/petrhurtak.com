import getConfig from "next/config";
import { z } from "zod";

const isProduction = process.env.NODE_ENV === "production";

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
    twitter: "https://twitter.com/PetrHurtak",
    linkedIn: "https://www.linkedin.com/in/hurtak/",
    instagram: "https://www.instagram.com/petr.hurtak/",
  },
  app: {
    generateRssInDev: false,
  },
  tokens: {
    googleAnalytics: "UA-93333552-1",
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
  articleTwitterSearch: (slug: string) =>
    `https://twitter.com/search?q=${encodeURIComponent(routes.absolute(routes.article(slug)))}`,
  articleGitHubLink: (articleDirectory: string) =>
    `${config.site.gitHub}/tree/main/articles/${encodeURIComponent(articleDirectory)}/index.tsx`,
  articleGitHubCommitHash: (commitHash: string) => `${config.site.gitHub}/commit/${encodeURIComponent(commitHash)}`,
} as const;

const validateNextConfig = z.object({
  serverRuntimeConfig: z.object({
    paths: z.object({
      project: z.string().min(1),
      articles: z.string().min(1),
      public: z.string().min(1),
    }),
    buildInfo: z.object({
      time: z.number().positive(),
      commitHash: z.string().min(1),
    }),
  }),
});
type NextConfig = z.infer<typeof validateNextConfig>;

export type ServerRuntimeConfig = NextConfig["serverRuntimeConfig"];

export const getServerRuntimeConfig = (): ServerRuntimeConfig => {
  const config = getConfig() as unknown;
  const configValidated = validateNextConfig.parse(config);

  return configValidated.serverRuntimeConfig;
};
