#!/bin/bash

bash scripts/install.sh
npm install -g serverless

cd app
serverless client remove --no-confirm
serverless remove
cd ../socket-server
serverless remove
cd ../api/users
serverless remove
cd ../tasks
serverless remove
cd ../notifications
serverless remove