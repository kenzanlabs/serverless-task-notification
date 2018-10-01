#!/bin/bash

cd ../api/users
serverless deploy 
cd ../tasks
serverless deploy
cd ../notifications
serverless deploy
cd ../../app
serverless deploy
#cd ../socket-server
#serverless deploy
