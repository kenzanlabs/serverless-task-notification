#!/bin/bash

# get the branch name
export CODEBUILD_GIT_BRANCH="$(git symbolic-ref HEAD --short 2>/dev/null)"
if [ "$CODEBUILD_GIT_BRANCH" = "" ] ; then
  CODEBUILD_GIT_BRANCH="$(git branch -a --contains HEAD 2>/dev/null | sed -n 2p | awk '{ printf $1 }')";
  export CODEBUILD_GIT_BRANCH=${CODEBUILD_GIT_BRANCH#remotes/origin/};
fi

# if the branch is master (ie, a PR is merged), run the deploy script
if [ "$CODEBUILD_GIT_BRANCH" = "master" ] ; then
  bash scripts/deploy.sh

  # Redeploy socket-server
  echo -e "$EC2_KEY" > serverless-task-notification.pem
  chmod 400 serverless-task-notification.pem
  export EC2_DNS=$(aws ec2 describe-instances --filters 'Name=tag:Name,Values=socketServer' --query 'Reservations[0].Instances[0].PublicDnsName') && export EC2_DNS="${EC2_DNS//\"/}"
  ssh -o StrictHostKeyChecking=no -i "serverless-task-notification.pem" ec2-user@$EC2_DNS 'bash -s' < socket-server/redeploy.sh
fi
