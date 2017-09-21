#!/bin/bash

cwd=$(pwd)
project_name=zen-camp-api

docker build -t ${project_name} .
docker run \
    -v ${cwd}/src:/usr/src/app/src \
    -p 8080:8080 \
    --env-file .env \
    -it ${project_name} /bin/bash