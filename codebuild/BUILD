export CODEBUILD_GIT_BRANCH="$(git symbolic-ref HEAD --short 2>/dev/null)"
echo "$CODEBUILD_GIT_BRANCH"
if [ "$CODEBUILD_GIT_BRANCH" = "master" ] ; then
  serverless deploy -v
fi
