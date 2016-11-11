#!/bin/bash -e

### DIRECTORY SETUP
cd "$(dirname "$0")" # cd into directory where script is located
cd .. # cd into app director

sudo docker build -t blog .
