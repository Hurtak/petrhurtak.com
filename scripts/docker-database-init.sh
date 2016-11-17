#!/bin/bash -e

cd "$(dirname "$0")/../database"

sudo docker exec -i blog-database mysql -u root -proot -e "DROP DATABASE hurtak_blog;"
sudo docker exec -i blog-database mysql -u root -proot -e "CREATE DATABASE hurtak_blog;"
sudo docker exec -i blog-database mysql -u root -proot hurtak_blog < schema.sql
