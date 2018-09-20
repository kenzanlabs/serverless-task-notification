# serverless-task-notification

![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiOGdxUTNNZllQc0ltaDJpSnNPTE9HTXljc3gzZ0x1ZlNiV1BaNDNlWnFaOU03N3k5cUx4blU3bnUwMGljeU1HWXB1S0c1V2ttaWV0aXJSK2VFZFovYVlBPSIsIml2UGFyYW1ldGVyU3BlYyI6Ikt5aHlTMzdoUTZjbExDTWsiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

assuming you have the appropriate AWS access key and secret key set:

install dependencies

```bash
npm install -g serverless
npm install
```

deploy api and populate users table

```bash
serverless deploy -v
node api/users/populateUsers.js
```

teardown api

```bash
serverless remove -v
```
