#!/bin/sh -ex

# checks if dev renders with default title, and checks that main javascripts don't have module build failure messages

DOMAIN=dev:3000
docker-compose run curl-dev $DOMAIN/ | grep 'Library Guest Passes'
! docker-compose run curl-dev $DOMAIN/static/js/bundle.js | grep 'Module build failed'
! docker-compose run curl-dev $DOMAIN/static/js/vendors~main.chunk.js | grep 'Module build failed'
! docker-compose run curl-dev $DOMAIN/static/js/main.chunk.js | grep 'Module build failed'
