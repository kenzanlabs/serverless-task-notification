#!/bin/bash

# update instance and redeploy
cd serverless-task-notification/socket-server
git pull
sudo service docker restart
docker build -t socket-server .
docker run -d -p 9000:9000 socket-server
