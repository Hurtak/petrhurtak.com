import preval from "preval.macro";

const { buildGitCommitHash, buildTimestamp, buildTime } = preval`
  module.exports = require("../../../scripts/build-info.js")();
` as {
  buildGitCommitHash: string;
  buildTimestamp: number;
  buildTime: number;
};

export { buildGitCommitHash, buildTimestamp, buildTime };
