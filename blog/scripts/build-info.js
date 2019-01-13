const { execSync } = require("child_process");

module.exports = () => {
  const now = new Date();

  const buildGitCommitHash = execSync("git rev-parse HEAD")
    .toString()
    .trim();
  const buildTimestamp = now.getTime();
  const buildTime = now.toLocaleString("cs");

  return {
    buildGitCommitHash,
    buildTimestamp,
    buildTime
  };
};
