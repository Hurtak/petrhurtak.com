#!/bin/bash -e

cd "$(dirname "$0")/.."

sudo docker run \
  --tty \
  --interactive \
  --rm \
  --user "node" \
  --env "NODE_ENV=development" \
  --publish 49160:8080 \
  --name blog \
  blog
