#!/bin/bash

# Provision EC2 instance, if needed
cd socket-server
serverless deploy -v

# Get in formation, lambdas!
cd ../api/users
serverless deploy
cd ../task
serverless deploy
cd ../notifications
serverless deploy 

# FE build and deploy
cd ../../app
npm run build
serverless deploy
cd ..