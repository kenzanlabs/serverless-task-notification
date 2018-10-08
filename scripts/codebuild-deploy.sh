#!/bin/bash

# get the branch name
export CODEBUILD_GIT_BRANCH="$(git symbolic-ref HEAD --short 2>/dev/null)"
if [ "$CODEBUILD_GIT_BRANCH" = "" ] ; then
  CODEBUILD_GIT_BRANCH="$(git branch -a --contains HEAD 2>/dev/null | sed -n 2p | awk '{ printf $1 }')";
  export CODEBUILD_GIT_BRANCH=${CODEBUILD_GIT_BRANCH#remotes/origin/};
  echo "ON BRANCH $CODEBUILD_GIT_BRANCH"
fi

# if the branch is master (ie, a PR is merged), run the deploy scripts
if [ "$CODEBUILD_GIT_BRANCH" = "master" ] ; then
  apt-get update -y
  apt-get install jq -y # used to parse resource exports 
  bash scripts/deploy.sh

  # Redeploy socket-server
  echo -e "$EC2_KEY" > serverless-task-notification.pem
  chmod 400 serverless-task-notification.pem
  export EC2_DNS=$(aws ec2 describe-instances --filters 'Name=tag:Name,Values=socketServer' --query 'Reservations[0].Instances[0].PublicDnsName') && export EC2_DNS="${EC2_DNS//\"/}"
  if [ "$EC2_DNS" = "" ]; then
    export EC2_DNS=$(aws ec2 describe-instances --filters 'Name=tag:Name,Values=socketServer' --query 'Reservations[1].Instances[0].PublicDnsName') && export EC2_DNS="${EC2_DNS//\"/}"
  fi
  if [ "$EC2_DNS" = "" ]; then
    export EC2_DNS=$(aws ec2 describe-instances --filters 'Name=tag:Name,Values=socketServer' --query 'Reservations[2].Instances[0].PublicDnsName') && export EC2_DNS="${EC2_DNS//\"/}"
  fi
  if [ "$EC2_DNS" = "" ]; then
    export EC2_DNS=$(aws ec2 describe-instances --filters 'Name=tag:Name,Values=socketServer' --query 'Reservations[3].Instances[0].PublicDnsName') && export EC2_DNS="${EC2_DNS//\"/}"
  fi
  if [ "$EC2_DNS" = "" ]; then
    export EC2_DNS=$(aws ec2 describe-instances --filters 'Name=tag:Name,Values=socketServer' --query 'Reservations[4].Instances[0].PublicDnsName') && export EC2_DNS="${EC2_DNS//\"/}"
  fi
  ssh -o StrictHostKeyChecking=no -i "serverless-task-notification.pem" ec2-user@$EC2_DNS 'bash -s' < socket-server/redeploy.sh
fi
