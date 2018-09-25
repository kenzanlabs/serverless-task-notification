"use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const snsClient = new AWS.SNS();

module.exports.handler = (event, context, callback) => {
  let requestBody;
  let item;
  let error = {
    statusCode: 500,
    headers: { "Content-Type": "text/plain" },
    body: "error creating task"
  };

  if (event.body) {
    requestBody = JSON.parse(event.body);
    console.log(requestBody);
    item = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      sessionID: requestBody.sessionID,
      contactID: requestBody.contactID,
      type: requestBody.type,
      body: requestBody.body
    };
  }

  if (!item) {
    callback(null, error);
  }

  dynamoClient.put({ TableName: "tasks", Item: item }, err => {
    if (err) {
      callback(null, error);
      return;
    }

    snsClient.publish(
      {
        TopicArn: "arn:aws:sns:us-east-1:884956725745:notify",
        Message: requestBody.sessionID + "," + item.id
      },
      (err, res) => {
        if (err) console.log(err);
      }
    );

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(item)
    });
  });
};
