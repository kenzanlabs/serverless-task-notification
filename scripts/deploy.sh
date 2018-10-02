#!/bin/bash

# install serverless framework
npm install -g serverless

# FE build and deploy
cd app
serverless deploy

# Provision EC2 instance, if needed
cd ../socket-server
serverless deploy

# Get in formation, lambdas!
cd ../api/users
serverless deploy 
cd ../tasks
serverless deploy
cd ../notifications
serverless deploy

