"use strict";

const aws = require("aws-sdk");

module.exports.get = (event, context, callback) => {
  let dynamo = new aws.DynamoDB.DocumentClient();
};
