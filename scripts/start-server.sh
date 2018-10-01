#!/bin/bash

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 8.11
aws s3 cp s3://serverless-app-ui/socket-server ./socket-server --recursive --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
cd socket-server
npm install 
node ./server/server.js