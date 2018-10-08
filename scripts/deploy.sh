#!/bin/bash

# install serverless framework
npm install -g serverless

# Provision EC2 instance, if needed
cd socket-server
serverless deploy

# Get in formation, lambdas!
cd ../api/users
serverless deploy
cd ../tasks
serverless deploy
cd ../notifications
serverless deploy 

# FE build and deploy
cd ../..
aws cloudformation list-exports | jq ".Exports" > config.json
node scripts/parse.js
eval "$(cat config.txt)" # this sets the environment variables for the FE (users and tasks apis, socketDNS)
cd app
npm run build
serverless deploy
cd ..