"use strict";

const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const snsClient = new AWS.SNS();

module.exports.handler = (event, context, callback) => {
  if (event.body) {
    let requestBody = JSON.parse(event.body);
    let newTask = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      sessionID: requestBody.sessionID,
      contactID: requestBody.contactID,
      type: requestBody.type,
      body: requestBody.body
    };

    dynamoClient.put({ TableName: "tasks", Item: newTask }, err => {
      if (err) {
        callback(null, {
          statusCode: 500
        });
        return;
      }

      snsClient.publish(
        {
          TopicArn: "arn:aws:sns:us-east-1:884956725745:newTask",
          Message: requestBody.sessionID + "," + newTask.id
        },
        (err, res) => {
          if (err) console.log(err);
        }
      );

      callback(null, {
        statusCode: 200,
        body: newTask.id
      });
      return;
    });
  } else {
    callback(null, {
      statusCode: 400
    });
    return;
  }
};
