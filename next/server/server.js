import express from "express";
import next from "next";
import apiArticles from "./api/articles.js";

const port = Number(process.env.APP_PORT) || 3000;
const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });
const nextRequestHandler = nextApp.getRequestHandler();

async function main() {
  await nextApp.prepare();

  const server = express();

  // API
  server.get("/api/articles", async (req, res) => {
    const articles = await apiArticles();
    res.json(articles);
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
