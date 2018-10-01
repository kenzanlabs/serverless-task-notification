"use strict";

const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  dynamoClient.delete(
    { TableName: "tasks", Key: { id: event.pathParameters.id } },
    err => {
      if (err) {
        callback(null, {
          statusCode: 500
        });
      } else {
        callback(null, {
          statusCode: 200
        });
      }
    }
  );
};
