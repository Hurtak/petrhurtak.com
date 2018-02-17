import express from "express";
import next from "next";
import helmet from "helmet";
import config from "../common/config.js";
import apiArticles from "./api/api-articles.js";
import apiArticle from "./api/api-article.js";
import rss from "./rss.js";

const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });
const nextRequestHandler = nextApp.getRequestHandler();

async function main() {
  console.log(`> Starting the app with Node ${process.version}`);

  await nextApp.prepare();

  const expressServer = express();
  expressServer.use(helmet());

  // API
  expressServer.get("/api/articles", async (req, res) => {
    const articles = await apiArticles();
    res.json(articles);
  });
  expressServer.get("/api/article/:url", async (req, res) => {
    const article = await apiArticle(req.params.url);
    res.json(article);
  });

  // Special
  expressServer.get("/rss", async (req, res) => {
    const articles = await apiArticles();
    const rssString = rss(articles);

    res.set("Content-Type", "application/rss+xml");
    res.send(rssString);
  });

  // Articles
  expressServer.get("/:articleUrl", (req, res) => {
    return nextApp.render(req, res, "/article", {
      articleUrl: req.params.articleUrl
    });
  });

  // Rest
  expressServer.get("*", (req, res) => {
    return nextRequestHandler(req, res);
  });

  // Start the server
  expressServer.listen(config.server.port, err => {
    if (err) throw err;
    console.log(`> Ready on ${config.server.url}`);
  });
}

main();
