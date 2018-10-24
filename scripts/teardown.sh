#!/bin/bash

# must run install for any serverless plugins
bash scripts/install.sh
npm install -g serverless

# remove FE client and serverless deployment
cd app
mkdir -p build # required for serverless-finch
serverless client remove --no-confirm
serverless remove

# remove notifications service
cd ../notifications
serverless remove
cd ../..

# remove tasks API
cd ../task
serverless remove

# remove users API
cd ../api/users
serverless remove

# remove the socket-server ec2 instance
cd ../socket-server
serverless remove