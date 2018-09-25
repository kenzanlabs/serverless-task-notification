"use strict";

const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  let taskID;
  if (event.pathParameters != undefined) {
    taskID = event.pathParameters.id;
  }

  dynamoClient.delete({ TableName: "tasks", Key: { id: taskID } }, err => {
    if (err) {
      callback(null, {
        statusCode: 500,
        headers: { "Content-Type": "text/plain" },
        body: "error deleting task"
      });
      return;
    }

    callback(null, {
      statusCode: 200,
      body: taskID
    });
  });
};
