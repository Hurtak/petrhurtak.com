export const config = {
  isDev: process.env.NODE_ENV === "development",

  siteDomain: "petrhurtak.com",
  siteDomainWithProtocol: "https://petrhurtak.com",
  author: {
    fullName: "Petr Hurtak",
    email: "petr.hurtak@gmail.com",
    twitter: "https://twitter.com/PetrHurtak",
  },
  googleAnalyticsId: "UA-93333552-1",
} as const;
