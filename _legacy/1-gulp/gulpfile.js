"use strict";

const path = require("path");
const fs = require("fs-extra");

const request = require("request");
const archiver = require("archiver");

const prettyBytes = require("pretty-bytes");
const realFavicon = require("gulp-real-favicon");

const paths = require("./src/compile/paths.js");
const nunjucks = require("./src/compile/nunjucks/env.js");

function logArchiveSize(archive) {
  console.log("archive size:", prettyBytes(archive.pointer()));
}

function deploy(done, productionBuild) {
  const archive = archiver("zip");

  archive.on("error", err => {
    console.error(err);
    done();
  });

  archive.directory(paths.dist, "/");
  archive.finalize();

  if (
    productionBuild &&
    process.env.TRAVIS === "true" &&
    process.env.TRAVIS_BRANCH === "master" &&
    process.env.TRAVIS_PULL_REQUEST === "false"
  ) {
    archive.pipe(
      request(
        {
          method: "POST",
          url:
            "https://api.netlify.com/api/v1/sites/hurtak.netlify.com/deploys",
          headers: {
            "Content-Type": "application/zip",
            // Passed in from Travis CI only when user us member of the repo,
            // so we do not have to worry about pull requests stealing the token
            // or updating the content of the site.
            Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`
          }
        },
        (error, response, body) => {
          logArchiveSize(archive);
          if (error) {
            throw error;
          } else if (response.statusCode !== 200) {
            throw body;
          } else {
            console.log("upload successful, server responded with:", body);
          }
          done();
        }
      )
    );
  } else {
    console.log("Deploy skipped");
    const writeStream = fs.createWriteStream(path.join(paths.dist, "site.zip"));
    writeStream.on("close", () => {
      logArchiveSize(archive);
      done();
    });
    archive.pipe(writeStream);
  }
}
