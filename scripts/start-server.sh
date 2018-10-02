#!/bin/bash

sudo yum install git -y
git clone https://github.com/kenzanlabs/serverless-task-notification.git
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 8.11
cd serverless-task-notification/socket-server
npm install 
node ./server/server.js