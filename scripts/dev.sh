#!/bin/bash

cd "$(dirname "$0")/.."

rm -rfv .nyc_output/
rm -rfv coverage/

### FUNCTIONS

NODE_BIN="node_modules/.bin"

function startServer {
  ${NODE_BIN}/nodemon src/server/index.js \
    --ext js,json,njk \
    --watch src/server \
    --watch src/config
}

function test {
  ${NODE_BIN}/ava src/test/**/*.js \
    --watch
}

function lint {
  ${NODE_BIN}/standard "scripts/**/*.js" "src/**/*.js" \
    --verbose
}

### START DEVELOPMENT SERVICES

startServer \
  & test \
  & lint
wait
