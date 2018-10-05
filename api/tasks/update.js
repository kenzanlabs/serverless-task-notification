"use strict";

const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  dynamoClient.get(
    {
      TableName: "tasks",
      Key: { id: event.pathParameters.id }
    },
    (err, task) => {
      if (err) return console.log(err);
      item = {
        id: task.id,
        contactID: task.contactID,
        type: task.type,
        body: task.body,
        complete: true
      };
      dynamoClient.put({ TableName: "tasks", Item: item }, err => {
        if (err) return console.log(err);
      });
    }
  );
};
