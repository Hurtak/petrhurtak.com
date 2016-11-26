#!/bin/bash

### DIRECTORY SETUP

cd "$(dirname "$0")/.."

rm -rfv .nyc_output/
rm -rfv coverage/

### EXPORTED VARIABLES

export NODE_ENV="development"
# export NODE_ENV="production"

### FUNCTIONS

NODE_BIN="node_modules/.bin"

function compile {
  ${NODE_BIN}/nodemon src/server/index.js \
    --ext js,json,njk \
    --watch src/server \
    --watch src/templates \
    --watch src/config
}

function serve {
  ${NODE_BIN}/http-server dist \
    --silent
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

compile \
  & serve \
  & test \
  & lint
wait
