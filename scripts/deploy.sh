cd api/users
serverless deploy
cd ../tasks
serverless deploy
cd ../notifications
serverless deploy
cd ../..
serverless client deploy --no-confirm
node ./api/users/populate.js