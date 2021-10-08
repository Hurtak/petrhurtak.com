import getConfig from "next/config";
import { z } from "zod";

const isProduction = process.env.NODE_ENV === "production";

export const config = {
  isProduction,
  isDev: !isProduction,

  siteDomain: "petrhurtak.com",
  siteDomainWithProtocol: "https://petrhurtak.com",
  author: {
    fullName: "Petr Hurtak",
    email: "petr.hurtak@gmail.com",
    twitter: "https://twitter.com/PetrHurtak",
  },

  generateRssInDev: false,

  googleAnalyticsId: "UA-93333552-1",
} as const;

export const routes = {
  // Helpers
  absolute: (relative: string) => `${config.siteDomainWithProtocol}${relative}`,

  // App routes
  root: "/",
  article: (slug: string) => `/article/${slug}`,

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
