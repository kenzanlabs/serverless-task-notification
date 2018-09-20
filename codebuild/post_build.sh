export CODEBUILD_GIT_BRANCH="$(git symbolic-ref HEAD --short 2>/dev/null)"
if [ "$CODEBUILD_GIT_BRANCH" = "" ] ; then
  CODEBUILD_GIT_BRANCH="$(git branch -a --contains HEAD 2>/dev/null | sed -n 2p | awk '{ printf $1 }')";
  export CODEBUILD_GIT_BRANCH=${CODEBUILD_GIT_BRANCH#remotes/origin/};
fi

if [ "$CODEBUILD_GIT_BRANCH" = "master" ] ; then
  node ./api/users/populateUsers.js
  aws s3 rm s3://serverless-task-notification-app --recursive
  aws s3 cp ./app/build s3://serverless-task-notification-app --recursive
fi
