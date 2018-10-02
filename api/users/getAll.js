"use strict";

const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  dynamoClient.scan({ TableName: "users" }, (err, result) => {
    if (err) {
      callback(null, {
        statusCode: 500
      });
      return;
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    });
  });
};
