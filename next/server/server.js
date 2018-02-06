import express from "express";
import next from "next";
import apiPosts from "./api/posts.js";

const port = Number(process.env.APP_PORT) || 3000;
const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });
const nextRequestHandler = nextApp.getRequestHandler();

async function main() {
  await nextApp.prepare();

  const server = express();

  // API
  server.get("/api/posts", async (req, res) => {
    const posts = await apiPosts();
    res.json(posts);
  });

  // Custom route for posts
  server.get("/post/:id", (req, res) => {
    return nextApp.render(req, res, "/post", {
      id: req.params.id
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
