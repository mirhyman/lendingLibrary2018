#!/usr/bin/env bash

if [ -z "$1" ]
  then
    echo "The first param must be the path to github ssh key: num run build ~/.ssh/id_rsa"
    exit 1;
fi

value=$(<$1)

name=${2:-seed}

docker build . -t $name --build-arg key="$value"
