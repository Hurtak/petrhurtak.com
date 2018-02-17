import next from "next";
import express from "express";
import apicache from "apicache";
import helmet from "helmet";
import config from "../common/config.js";
import * as api from "./api.js";
import rss from "./rss.js";

async function main() {
  console.log(`> Starting the app with Node ${process.version}`);

  const dev = process.env.NODE_ENV !== "production";

  const nextApp = next({ dev });
  const nextRequestHandler = nextApp.getRequestHandler();
  await nextApp.prepare();

  const cacheMiddleware = apicache
    .options({ enabled: !dev })
    .middleware(config.cacheDuration);

  const expressServer = express();
  expressServer.enable("strict routing");
  expressServer.use(unifySlashesMiddleware());
  expressServer.use(removeTrailingSlashesMiddleware());
  expressServer.use(helmet());

  //
  // API
  //
  expressServer.get("/api/articles", cacheMiddleware, async (req, res) => {
    const articles = await api.articles();
    res.json(articles);
  });

  expressServer.get("/api/article/:url", cacheMiddleware, async (req, res) => {
    const article = await api.article(req.params.url);
    if (!article) {
      res.status(404);
      res.send("Article not found");
      return;
    }

    res.json(article);
  });

  expressServer.get("/api/*", (req, res) => {
    res.status(405);
    res.send("Method not allowed");
  });

  //
  // Special
  //
  expressServer.get("/rss", cacheMiddleware, async (req, res) => {
    const articles = await api.articles();
    const rssString = rss(articles);

    res.set("Content-Type", "application/rss+xml");
    res.send(rssString);
  });

  //
  // Articles
  //
  expressServer.get("/:articleUrl", (req, res) => {
    return nextApp.render(req, res, "/article", {
      articleUrl: req.params.articleUrl
    });
  });

  //
  // Rest
  //
  expressServer.get("*", (req, res) => {
    return nextRequestHandler(req, res);
  });

  //
  // Start the server
  //
  expressServer.listen(config.server.port, err => {
    if (err) throw err;
    console.log(`> Ready on ${config.server.url}`);
  });
}

function unifySlashesMiddleware() {
  const multipleSlashes = /[/]{2,}/g;

  return function(req, res, next) {
    if (multipleSlashes.test(req.originalUrl)) {
      const fixedUrl = req.originalUrl.replace(multipleSlashes, "/");
      res.redirect(301, fixedUrl);
    } else {
      next();
    }
  };
}

function removeTrailingSlashesMiddleware() {
  return function(req, res, next) {
    if (req.path !== "/" && req.path.endsWith("/")) {
      const search = req.originalUrl.replace(req.path, "");
      const fixedUrl = req.path.slice(0, -1) + search;
      res.redirect(301, fixedUrl);
    } else {
      next();
    }
  };
}

main();
