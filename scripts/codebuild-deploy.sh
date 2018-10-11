#!/bin/bash

set -e

# get the branch name
export GIT_BRANCH="$(git symbolic-ref HEAD --short 2>/dev/null)"
if [ "$GIT_BRANCH" = "" ] ; then
  GIT_BRANCH="$(git branch -a --contains HEAD 2>/dev/null | sed -n 2p | awk '{ printf $1 }')";
  export GIT_BRANCH=${GIT_BRANCH#remotes/origin/};
fi

# if the branch is master (ie, a PR is merged), run the deploy scripts
if [ "$GIT_BRANCH" = "master" ] ; then

  # Deploys the app; setting the SOCKET_DNS environment variable in the process
  bash scripts/deploy.sh

  # Redeploy socket-server -- must set pem to $EC2_KEY environment variable -- this is done in CodeBuild
  bash scripts/get-env.sh
  eval "$(cat config.txt)" # this sets the environment variables
  rm config.txt

  echo -e "$EC2_KEY" > serverless-task-notification.pem
  chmod 400 serverless-task-notification.pem
  ssh -o StrictHostKeyChecking=no -i "serverless-task-notification.pem" ec2-user@$SOCKET_DNS 'bash -s' < socket-server/redeploy.sh
fi
