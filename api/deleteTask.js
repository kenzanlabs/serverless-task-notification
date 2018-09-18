"use strict";

const aws = require("aws-sdk");

module.exports.delete = (event, context, callback) => {
  let dynamo = new aws.DynamoDB.DocumentClient();
};
