"use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  let tablename = event.tablename;
  if (tablename == "" || tablename == undefined || tablename == null) {
    tablename = "tasks";
  }

  let requestBody;
  let item;
  let error = {
    statusCode: 500,
    headers: { "Content-Type": "text/plain" },
    body: "error creating task"
  };

  if (event.body !== undefined) {
    requestBody = event.body;
    item = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      contactID: requestBody.contactID,
      type: requestBody.type,
      body: requestBody.body
    };
  }

  if (item == undefined) {
    callback(null, error);
  }

  dynamoClient.put({ TableName: tablename, Item: item }, err => {
    if (err) {
      callback(null, error);
      return;
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(item)
    });
  });
};
