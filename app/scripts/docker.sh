#!/bin/bash -e

### DIRECTORY SETUP
cd "$(dirname "$0")" # cd into directory where script is located
cd .. # cd into app director

sudo docker run \
  -e "NODE_ENV=development" \
  -u "node" \
  -p 49160:8080 \
  blog
