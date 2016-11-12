#!/bin/bash -e

cd "$(dirname "$0")/../db"

sudo docker build -t blog-database .
