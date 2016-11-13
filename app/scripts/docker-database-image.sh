#!/bin/bash -e

cd "$(dirname "$0")/../database"

sudo docker build -t blog-database .
