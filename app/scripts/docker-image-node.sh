#!/bin/bash -e

cd "$(dirname "$0")/.."

sudo docker build -t blog .
