#!/bin/bash

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name": "'$2'"}' \
  http://localhost:3000/filesystems/test_pool/$1/snapshots