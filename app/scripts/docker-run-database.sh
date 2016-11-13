#!/bin/bash -e

cd "$(dirname "$0")/.."

sudo docker run \
  --tty \
  --interactive \
  --rm \
  --user "mysql" \
  --env MYSQL_ROOT_PASSWORD="root" \
  --env MYSQL_DATABASE="hurtak_blog" \
  --publish 3306:3306 \
  --name blog-database \
  blog-database
