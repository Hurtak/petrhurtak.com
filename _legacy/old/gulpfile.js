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

async function generateFavicons(done, productionBuild) {
  if (!productionBuild) {
    await fs.remove(paths.distFavicons);
    await fs.symlink(paths.favicons, paths.distFavicons);
    done();
    return;
  }

  await new Promise((resolve, reject) => {
    const faviconTmpDataPath = path.join(__dirname, "_faviconsData.json");

    realFavicon.generateFavicon(
      {
        // config generated from http://realfavicongenerator.net
        masterPicture: path.join(paths.favicons, "favicon.svg"),
        dest: paths.distFavicons,
        iconsPath: "/static/favicons/",
        design: {
          ios: {
            pictureAspect: "backgroundAndMargin",
            backgroundColor: "#69d2e7",
            margin: "0%",
            assets: {
              ios6AndPriorIcons: false,
              ios7AndLaterIcons: false,
              precomposedIcons: false,
              declareOnlyDefaultIcon: true
            }
          },
          desktopBrowser: {},
          windows: {
            pictureAspect: "noChange",
            backgroundColor: "#2b5797",
            onConflict: "override",
            assets: {
              windows80Ie10Tile: false,
              windows10Ie11EdgeTiles: {
                small: false,
                medium: true,
                big: false,
                rectangle: false
              }
            }
          },
          androidChrome: {
            pictureAspect: "shadow",
            themeColor: "#69d2e7",
            manifest: {
              display: "standalone",
              orientation: "notSet",
              onConflict: "override",
              declared: true
            },
            assets: {
              legacyIcon: false,
              lowResolutionIcons: false
            }
          },
          safariPinnedTab: {
            pictureAspect: "blackAndWhite",
            threshold: 80,
            themeColor: "#5bbad5"
          }
        },
        settings: {
          scalingAlgorithm: "Mitchell",
          errorOnImageTooSmall: false
        },
        markupFile: faviconTmpDataPath
      },
      async function() {
        const faviconsDataRaw = await fs.readFile(faviconTmpDataPath, "utf8");
        await fs.remove(faviconTmpDataPath);

        const faviconsData = JSON.parse(faviconsDataRaw);

        await new Promise((resolve, reject) => {
          realFavicon.checkForUpdates(faviconsData.version, err => {
            if (err) throw err;
            resolve();
          });
        });
        const faviconsHtml = faviconsData.favicon.html_code;
        nunjucks.addGlobal("faviconsHtml", faviconsHtml);

        resolve();
      }
    );
  });

  done();
}
