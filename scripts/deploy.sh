#!/bin/bash

# install serverless framework
npm install -g serverless

# Provision EC2 instance, if needed
cd socket-server
serverless deploy --aws-s3-accelerate

# Get in formation, lambdas!
cd ../api/users
serverless deploy --aws-s3-accelerate
cd ../tasks
serverless deploy --aws-s3-accelerate
cd ../notifications
serverless deploy --aws-s3-accelerate

# FE build and deploy
cd ../../app
serverless deploy --aws-s3-accelerate

