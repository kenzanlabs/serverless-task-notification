# Serverless Task Notification App

![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiOGdxUTNNZllQc0ltaDJpSnNPTE9HTXljc3gzZ0x1ZlNiV1BaNDNlWnFaOU03N3k5cUx4blU3bnUwMGljeU1HWXB1S0c1V2ttaWV0aXJSK2VFZFovYVlBPSIsIml2UGFyYW1ldGVyU3BlYyI6Ikt5aHlTMzdoUTZjbExDTWsiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

## Overview

**_Task notification app_** is a demo application designed to showcase the power of the [Serverless Framework](https://serverless.com) using popular Serverless technologies.
In this example, we utilize [AWS](https://aws.amazon.com) as our Serverless provider.

The **Serverless Framework** is an open-source CLI for building and deploying serverless applications.

## Architecture

#### Technology Stack

**FE**:

- [React](https://reactjs.org/)
- [Material UI](https://material-ui.com/)
- [Storybook](https://storybook.js.org/)

**Backend**:

- [Serverless Framework](https://serverless.com)
- [AWS](https://aws.amazon.com)
  - EC2 / Node.js / Socket.io websocket connections
  - Lambda
  - Api gateway
  - SNS
  - SES
  - Dynamo DB
  - CodeBuild

![Architecture Diagram](./images/app-architecture.png "Architecture Diagram")

## CI/CD Workflow

![Workflow](./images/workflow.png "Workflow Diagram")

## How to run

**Installing Node.js**

Serverless is a Node.js CLI tool so the first thing you need to do is to install Node.js on your machine.
Visit [Node.js](https://nodejs.org/en/) official page for intallation on your local machine.

**Installing the Serverless Framework**

Serverless Framework is installed via npm which was already installed when you installed Node.js.

Open a terminal and type the following command:

```bash
npm install -g serverless
```

Once the installation process is done, you can verify that _Serverless_ was installed successfully by checking the current version by running:

```bash
serverless --version
```

**Setting up AWS**

The Serverless Framework needs access to your cloud provider's account so that it can create and manage resources on your behalf.
See the original [Serverless documentation AWS - Credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/) for more details.

**Deploying _serverless-task-notification_**

_Make sure you have the appropriate AWS access key and secret key set!_

Scripts are provided for installing dependencies, running tests, and deploying

```bash
bash scripts/install.sh
bash scripts/test.sh
bash scripts/deploy.sh
```

The scripts handle the installation of dependencies and deployment of the full API and FE application. To deploy a specific service, go into its directory and run `serverless deploy`

**Running the front-end**
1. Go into `app/` and run `npm i`
2. Run `npm start`. The app is now running on http://localhost:3000
