#!/bin/sh -ex

#curl $DOMAIN/ > $DIR/root.html
#curl $DOMAIN/static/js/bundle.js > $DIR/bundle.js
#curl $DOMAIN/static/js/vendors~main.chunk.js > $DIR/vendors~main.chunk.js
#curl $DOMAIN/static/js/main.chunk.js > $DIR/main.chunk.js

DOMAIN=dev:3000
docker-compose run curl-dev $DOMAIN/ | grep 'Library Guest Passes'
! docker-compose run curl-dev $DOMAIN/static/js/bundle.js | grep 'Module build failed'
! docker-compose run curl-dev $DOMAIN/static/js/vendors~main.chunk.js | grep 'Module build failed'
! docker-compose run curl-dev $DOMAIN/static/js/main.chunk.js | grep 'Module build failed'

#check_url_no_match() {
#  url=$1
#  if [ -z "$url" ]; then
#    echo "Must specify url as first argument of check_url_no_match"
#    exit 1
#  fi
#
#  no_match_string=$2
#  if [ -z "$no_match_string" ]; then
#    echo "Must specify a string for url content to NOT match as second argument of check_url_no_match"
#    exit 1
#  fi
#
#  if curl $url | grep $no_match_string
#}
