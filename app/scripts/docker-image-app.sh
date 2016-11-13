#!/bin/bash -e

cd "$(dirname "$0")/../src"

sudo docker build -t blog .
