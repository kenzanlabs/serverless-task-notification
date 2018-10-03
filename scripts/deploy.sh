#!/bin/bash

# install serverless framework
npm install -g serverless

# Provision EC2 instance, if needed
cd socket-server
serverless deploy --aws-s3-accelerate -v 

# Get in formation, lambdas!
cd ../api/users
serverless deploy --aws-s3-accelerate -v 
cd ../tasks
serverless deploy --aws-s3-accelerate -v 
cd ../notifications
serverless deploy --aws-s3-accelerate -v 

# FE build and deploy
cd ../../app
serverless deploy --aws-s3-accelerate -v

# Redeploy socket-server
echo "$EC2_KEY" > serverless-task-notification.pem
chmod 400 serverless-task-notification.pem
export EC2_DNS=$(aws ec2 describe-instances --filters 'Name=tag:Name,Values=socketServer' --query 'Reservations[0].Instances[0].PublicDnsName') && export EC2_DNS="${EC2_DNS//\"/}"
ssh -o StrictHostKeyChecking=no -i "serverless-task-notification.pem" ec2-user@$EC2_DNS 'bash -s' < socket-server/redeploy.sh