"use strict";

const aws = require("aws-sdk");

module.exports.create = (event, context, callback) => {
  let dynamo = new aws.DynamoDB.DocumentClient();
};
