import express from "express";
import next from "next";
import helmet from "helmet";
import apiArticles from "./api/articles.js";
import rss from "./rss.js";

const port = Number(process.env.APP_PORT) || 3000;
const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });
const nextRequestHandler = nextApp.getRequestHandler();

async function main() {
  await nextApp.prepare();

  const server = express();
  server.use(helmet());

  // API
  server.get("/api/articles", async (req, res) => {
    const articles = await apiArticles();
    res.json(articles);
  });

  server.get("/rss", async (req, res) => {
    const articles = await apiArticles();
    const rssString = rss(articles);

    res.set("Content-Type", "application/rss+xml");
    res.send(rssString);
  });

  server.get("/:articleUrl", (req, res) => {
    return nextApp.render(req, res, "/post", {
      id: req.params.articleUrl
    });
  });

  server.get("*", (req, res) => {
    return nextRequestHandler(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}

main();
