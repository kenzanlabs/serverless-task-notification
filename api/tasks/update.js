"use strict";

const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  dynamoClient.get(
    {
      TableName: "tasks",
      Key: { id: event.pathParameters.id }
    },
    (err, result) => {
      if (err) return console.log(err);
      result.Item.complete = true;
      dynamoClient.put({ TableName: "tasks", Item: result.Item }, err => {
        if (err) return console.log(err);
        callback(null, { statusCode: 200 });
      });
    }
  );
};
