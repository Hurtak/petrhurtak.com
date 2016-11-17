#!/bin/bash

### DIRECTORY SETUP
cd "$(dirname "$0")" # cd into directory where script is located
cd .. # cd into app director

### PREPARE DIRECTORIES FOR APP
mkdir -pv www/log/app-message
mkdir -pv www/log/exceptions
mkdir -pv www/articles
