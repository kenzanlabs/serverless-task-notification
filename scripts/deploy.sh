cd api/users
echo "\nDeploying users service"
serverless deploy
cd ../tasks
echo "\nDeploying tasks service"
serverless deploy
cd ../notifications
echo "Deploying notifications service"
serverless deploy
cd ../..
echo "\nDeploying FE app"
serverless client deploy --no-confirm
node ./api/users/populate.js