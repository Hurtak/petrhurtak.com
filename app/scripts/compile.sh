#!/bin/bash -e

### DIRECTORY SETUP
cd "$(dirname "$0")" # cd into directory where script is located
cd .. # cd into app director

### ARTICLE IMAGES
mkdir -pv www/articles/components/images/
cp -rfv ../articles/2016-10-10-components/images/* www/articles/components/images/
