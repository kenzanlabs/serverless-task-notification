"use strict";

const AWS = require("aws-sdk");
const shortid = require("shortid");
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const snsClient = new AWS.SNS();

module.exports.handler = (event, context, callback) => {
  if (event.body) {
    let requestBody = JSON.parse(event.body);
    let newTask = {
      id: shortid.generate(),
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
          Message: newTask.id
        },
        (err, res) => {
          if (err) console.log(err);
        }
      );

      callback(null, {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
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
