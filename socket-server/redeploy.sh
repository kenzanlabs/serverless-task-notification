#!/bin/bash

# update instance and redeploy
cd serverless-task-notification/socket-server
git pull
docker build -t socket-server .
docker stop $(docker ps -aq)
docker run -d -p 9000:9000 socket-server
