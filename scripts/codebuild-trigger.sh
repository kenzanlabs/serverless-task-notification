#!/bin/bash

# this script triggers a build of the master branch on codebuild -- good for reverting after testing a branch deploy
aws codebuild start-build --project-name serverless-task-notification-pipeline --source-version master >/dev/null