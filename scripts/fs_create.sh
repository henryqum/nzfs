#!/bin/bash

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"test_pool/'$1'"}' \
  http://localhost:3000/filesystems