# serverless-task-notification

![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoicmR5S2R3QmlNY2FKcktJQWp2c0JSaFpnWTJ3TFpieDNQbXpiZU1oWHhkMVNiVG15TzByaERIaFJua3FtczRTZlZQRm9zVXFUWHczaXgveGFHTjlkL1JJPSIsIml2UGFyYW1ldGVyU3BlYyI6IjBZQnByTE9RZ3JwSGhLdnMiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

assuming you have the appropriate AWS access key and secret key set:

install dependencies

```bash
npm install -g serverless
npm install
```

deploy api and populate users table

```bash
serverless deploy -v
node api/users/populate.js
```

teardown api

```bash
serverless remove -v
```
