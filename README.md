# serverless-task-notification

![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiaERVWVl0cHlZRFpGQS9LV2NjcFh5ZFhwR2VvYm9sN3ROUHlIWDJSS1NXMGN1RUxveWJsNWtJQWYrTDBHY1RPT3hiQTd1MzNia2g4ZzU3dnQ5TWNtTWM0PSIsIml2UGFyYW1ldGVyU3BlYyI6IkI4c0dwYXFPaEQvSE1kMXQiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

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
