cd api/users
echo "Deploying users service"
serverless deploy
cd ../tasks
echo "Deploying tasks service"
serverless deploy
cd ../notifications
echo "Deploying notifications service"
serverless deploy
cd ../..
echo "Deploying FE app"
serverless client deploy --no-confirm
echo "Populating users table"
node ./api/users/populate.js