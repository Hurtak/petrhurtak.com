"use strict";

const PrettyError = require("pretty-error");
const config = require("./config.js");

module.exports = function() {
  const error = new PrettyError();
  error.skipNodeFiles();
  error.skipPackage(config.debugSkipPackages);
  error.start();
};
