#!/bin/bash

# must run install for any serverless plugins
bash scripts/install.sh
npm install -g serverless

echo 'Removing resources'
cd resources
serverless remove
cd ..

# remove FE client and serverless deployment
echo 'Removing UI'
cd app
mkdir -p build # required for serverless-finch
serverless client remove --no-confirm
serverless remove
cd ..

# remove notifications service
echo 'Removing notifications service'
cd api/notifications
serverless remove
cd ..

# remove tasks API
echo 'Removing tasks API'
cd task
serverless remove
cd ..

# remove users API
echo 'Removing users API'
cd users
serverless remove