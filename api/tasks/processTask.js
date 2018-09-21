"use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const snsClient = new AWS.SNS();

const topicArn = "arn:aws:sns:us-east-1:884956725745:sendMessage";

module.exports.process = event => {
  console.log(event);
};
