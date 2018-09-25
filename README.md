# Serverless Task Notification App

![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiOGdxUTNNZllQc0ltaDJpSnNPTE9HTXljc3gzZ0x1ZlNiV1BaNDNlWnFaOU03N3k5cUx4blU3bnUwMGljeU1HWXB1S0c1V2ttaWV0aXJSK2VFZFovYVlBPSIsIml2UGFyYW1ldGVyU3BlYyI6Ikt5aHlTMzdoUTZjbExDTWsiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

Make sure you have the right AWS access key and secret key set!

Build & Deploy:

```bash
bash scripts/install.sh
bash scripts/build.sh
serverless deploy
```

The scripts install the Serverless framework and all required dependencies, then build the FE artifacts.

Serverless handles the rest!

To completely teardown your deployment use: `bash scripts/teardown.sh`
