"use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  dynamoClient.scan({ TableName: "users" }, (err, result) => {
    if (err) {
      callback(null, {
        statusCode: 500,
        headers: { "Content-Type": "text/plain" },
        body: "error getting users"
      });
      return;
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        sessionID: Math.floor(1000 + Math.random() * 9000).toString(),
        users: result.Items
      })
    });
  });
};
