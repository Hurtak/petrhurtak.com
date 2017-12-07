#!/usr/bin/env node

const crypto = require("crypto");

const hash = crypto
  .createHash("sha256")
  .update(String(Math.random()))
  .digest("hex")
  .slice(0, 32);

console.log(hash);
