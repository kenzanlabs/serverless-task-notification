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
fi
