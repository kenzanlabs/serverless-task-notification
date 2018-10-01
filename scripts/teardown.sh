cd api/users
sls remove
cd ../tasks
sls remove
cd ../notifications
sls remove
cd ../..
sls remove && sls client remove --no-confirm