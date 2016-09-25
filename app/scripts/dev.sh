#!/bin/bash

### DIRECTORY SETUP
cd "$(dirname "$0")" # cd into directory where script is located
cd .. # cd into app director

### EXPORTED VARIABLES
export NODE_ENV="development"
# export NODE_ENV="production"
# export DEBUG="express*"

### LOCAL VARIABLES
NODE_BIN="node_modules/.bin"

### FUNCTIONS
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
  # & test \
  & lint
wait
