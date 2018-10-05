"use strict";

const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = event => {
  const taskID = event.Records[0].Sns.Message;
  dynamoClient.get(
    {
      TableName: "tasks",
      Key: { id: taskID }
    },
    (err, result) => {
      if (err) return console.log(err);
      result.Item.complete = true;
      dynamoClient.put({ TableName: "tasks", Item: result.Item }, err => {
        if (err) return console.log(err);
      });
    }
  );
};
