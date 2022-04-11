# Dualis-Bot

Dualis Bot Repository - visit us [here](http://dualis-bot.robin-reyer.de)

## Build / Run Backend and Crawler

from directory /dualis-bot `docker-compose build | docker-compose up`

## Run Backend Tests

`deno test --allow-env --allow-read --importmap=./backend/tests/importmap.json`

## Run Crawler Tests

`cd dualis-crawler | go test -v ./...`

## [Backend-Doku](https://gitlab.com/lumaghg/dualis-bot-backend-doku/-/tree/main)
