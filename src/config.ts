import getConfig from "next/config";
import { z } from "zod";

const isProduction = process.env.NODE_ENV === "production";

export const config = {
  isProduction,
  isDev: !isProduction,

  site: {
    domain: "petrhurtak.com",
    domainWithProtocol: "https://petrhurtak.com",
    yearFounded: 2015,
  },
  author: {
    fullName: "Petr Hurtak",
    email: "petr.hurtak@gmail.com",

    github: "https://github.com/hurtak",
    twitter: "https://twitter.com/PetrHurtak",
    linkedIn: "https://www.linkedin.com/in/hurtak/",
    instagram: "https://www.instagram.com/petr.hurtak/",
  },
  app: {
    generateRssInDev: true,
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

  // Other
  favicon: `/favicon.svg`,
  rss: {
    root: "/rss",
    rss2: "/rss/feed.xml",
    atom: "/rss/atom.xml",
    jsonFeed: "/rss/feed.json",
  },
} as const;

const validateServerRuntimeConfig = z.object({
  paths: z.object({
    project: z.string().min(1),
    articles: z.string().min(1),
    public: z.string().min(1),
  }),
});
type ServerRuntimeConfig = z.infer<typeof validateServerRuntimeConfig>;

export const getServerRuntimeConfig = (): ServerRuntimeConfig => {
  const { serverRuntimeConfig } = getConfig();
  return validateServerRuntimeConfig.parse(serverRuntimeConfig);
};
