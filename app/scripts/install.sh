#!/bin/bash

### DIRECTORY SETUP
cd "$(dirname "$0")" # cd into directory where script is located
cd .. # cd into app director

### PREPARE DIRECTORIES FOR APP
mkdir -p www
mkdir -p www/log
mkdir -p www/articles

### INSTALL DEPENDENCIES
npm install
