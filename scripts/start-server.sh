#!/bin/bash

# setup instance
sudo yum install git docker -y
sudo usermod -aG docker ec2-user
logout

# run the socket-server
sudo service docker restart
git clone https://github.com/kenzanlabs/serverless-task-notification.git
cd serverless-task-notification/socket-server
docker build -t socket-server .
docker run -d -p 9000:9000 socket-server

# restart with changes
cd serverless-task-notification
git pull
cd socket-server
sudo service docker restart
docker build -t socket-server .
docker run -d -p 9000:9000 socket-server
