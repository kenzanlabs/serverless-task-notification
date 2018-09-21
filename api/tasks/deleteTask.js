"use strict";

const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
  let tablename = event.tablename;
  if (tablename == "" || tablename == undefined || tablename == null) {
    tablename = "tasks";
  }

  let taskID;
  if (event.pathParameters != undefined) {
    taskID = event.pathParameters.id;
  }

  dynamoClient.delete({ TableName: tablename, Key: { id: taskID } }, err => {
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
