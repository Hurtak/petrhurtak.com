import fs from "fs";
import path from "path";
import next from "next";
import express from "express";
import apicache from "apicache";
import helmet from "helmet";
import config from "../next.config.js";
import * as api from "./api.js";
import rss from "./rss.js";
import { r } from "../articles/articles-router.js";

async function main() {
  console.log(`> Starting the app with Node ${process.version}`);

  const nextApp = next({
    dev: config.publicRuntimeConfig.dev,
    conf: config
  });
  const nextRequestHandler = nextApp.getRequestHandler();
  await nextApp.prepare();

  const middlewareCache = apicache
    .options({ enabled: !config.publicRuntimeConfig.dev })
    .middleware(config.serverRuntimeConfig.cacheDuration);

  const expressServer = express();
  expressServer.enable("strict routing");
  expressServer.use(unifySlashesMiddleware());
  expressServer.use(helmet());

  //
  // API
  //
  expressServer.get("/api/articles", middlewareCache, async (req, res) => {
    const articles = await api.articles();
    res.json(articles);
  });

  expressServer.get("/api/article/:url", middlewareCache, async (req, res) => {
    const article = await api.article(req.params.url);
    if (!article) {
      res.status(404);
      res.send("Article not found");
      return;
    }

    res.json(article);
  });

  expressServer.get("/api/*", middlewareRemoveTrailingSlash, (req, res) => {
    res.status(405);
    res.send("Method not allowed");
  });

  //
  // Special
  //
  expressServer.get("/rss", middlewareCache, async (req, res) => {
    const articles = await api.articles();
    const rssString = rss(articles);

    res.set("Content-Type", "application/rss+xml");
    res.send(rssString);
  });
  expressServer.get("/rss/", middlewareRemoveTrailingSlash);

  //
  // Articles
  //
  expressServer.get("/:articleUrl", middlewareAddTrailingSlash);
  expressServer.get("/:articleUrl/", (req, res) => {
    return nextApp.render(req, res, "/article", {
      articleUrl: req.params.articleUrl
    });
  });

  //
  // Articles static files + rest
  //
  expressServer.get("/:maybeArticleUrl/*", (req, res) => {
    const maybeArticleUrl = req.params.maybeArticleUrl;
    const maybeRelativePathArticle = r[maybeArticleUrl]
      ? r[maybeArticleUrl].folder
      : null;

    if (!maybeRelativePathArticle) {
      return nextRequestHandler(req, res);
    }

    const articlePathRelative = maybeRelativePathArticle;
    const restPath = req.params[0];

    const root = path.join(__dirname, "..");
    const pathRelativeToRoot = path.join(
      "articles",
      articlePathRelative,
      restPath
    );
    const pathAbsolute = path.join(root, pathRelativeToRoot);

    // TODO: redo to async/await or promise
    fs.lstat(pathAbsolute, (err, stats) => {
      if (err || !stats.isFile()) {
        nextRequestHandler(req, res);
      } else {
        res.sendfile(pathRelativeToRoot, { root: root });
      }
    });
  });

  //
  // Start the server
  //
  expressServer.listen(config.serverRuntimeConfig.port, err => {
    if (err) throw err;
    console.log(`> Ready on port ${config.serverRuntimeConfig.port}`);
  });
}

//
// Middlewares
//

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

function middlewareRemoveTrailingSlash(req, res, next) {
  if (req.path !== "/" && req.path.endsWith("/")) {
    const search = req.originalUrl.replace(req.path, "");
    const fixedUrl = req.path.slice(0, -1) + search;
    res.redirect(301, fixedUrl);
  } else {
    next();
  }
}

function middlewareAddTrailingSlash(req, res, next) {
  if (!req.path.endsWith("/")) {
    const search = req.originalUrl.replace(req.path, "");
    const fixedUrl = req.path + "/" + search;
    res.redirect(301, fixedUrl);
  } else {
    next();
  }
}

//
// Start
//

main();
