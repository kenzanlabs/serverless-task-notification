"use strict";

const aws = require("aws-sdk");
const dynamoClient = new aws.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  dynamoClient.scan({ TableName: "users" }, (err, result) => {
    if (err) {
      console.log(err);
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "application/json" },
        body: { message: "error getting users" }
      });
      return;
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    });
  });
};
