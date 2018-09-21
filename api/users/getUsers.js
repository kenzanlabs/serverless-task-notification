"use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  dynamoClient.scan({ TableName: "users" }, (err, result) => {
    if (err) {
      console.log(err);
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "application/json" },
        body: { message: "error getting tasks" }
      });
      return;
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    });
  });
};
