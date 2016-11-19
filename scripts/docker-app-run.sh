#!/bin/bash -e

cd "$(dirname "$0")/.."

sudo docker run \
  --tty \
  --interactive \
  --rm \
  --user "node" \
  --env "NODE_ENV=development" \
  --publish 8000:8000 \
  --volume $(pwd)/src:/usr/src/app/src \
  --name blog \
  blog
