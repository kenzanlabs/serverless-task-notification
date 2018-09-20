"use strict";

const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
  let taskID = event.pathParameters.id;
  dynamoClient.delete({ TableName: "tasks", Key: { id: taskID } }, err => {
    if (err) {
      console.log(err);
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "application/json" },
        body: { message: "error deleting task" }
      });
      return;
    }
    callback(null, {
      statusCode: 200,
      body: taskID
    });
  });
};
