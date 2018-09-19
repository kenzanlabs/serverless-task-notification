"use strict";

const aws = require("aws-sdk");

module.exports.process = (event, context, callback) => {
  let dynamo = new aws.DynamoDB.DocumentClient();
};
