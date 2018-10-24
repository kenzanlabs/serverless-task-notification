#!/bin/bash

# Provision EC2 instance, if needed
echo 'Deploying resources'
cd resources
serverless deploy
cd ..

# Get in formation, lambdas!
echo 'Deploying API'
cd api/users
serverless deploy
cd ../task
serverless deploy
echo 'Deploying notifications service'
cd ../notifications
serverless deploy 
cd ../..

# FE build and deploy
echo 'Deploying UI'
cd app
npm run build
serverless deploy
cd ..