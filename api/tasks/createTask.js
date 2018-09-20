"use strict";

const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  let requestBody = JSON.parse(event.body);
  let item = {
    id: require("shortid").generate(),
    contactID: requestBody.contactID,
    type: requestBody.notificationType,
    body: requestBody.body
  };
  dynamoClient.put({ TableName: "tasks", Item: item }, err => {
    if (err) {
      console.log(err);
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "application/json" },
        body: { message: "error creating task" }
      });
      return;
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(item)
    });
  });
};
