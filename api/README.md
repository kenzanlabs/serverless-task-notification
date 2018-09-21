# Serverless Task Notification API Lambdas

![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiOGdxUTNNZllQc0ltaDJpSnNPTE9HTXljc3gzZ0x1ZlNiV1BaNDNlWnFaOU03N3k5cUx4blU3bnUwMGljeU1HWXB1S0c1V2ttaWV0aXJSK2VFZFovYVlBPSIsIml2UGFyYW1ldGVyU3BlYyI6Ikt5aHlTMzdoUTZjbExDTWsiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

make sure you have your AWS creds set!

fire up the API from the root directory:

```bash
npm install -g serverless
npm install
serverless deploy -v
node api/test/populateUsers.js
```

if you ever need to teardown the API:

```bash
serverless remove -v && serverless client remove
```
