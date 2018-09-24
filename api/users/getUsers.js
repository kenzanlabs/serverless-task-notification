"use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  let tablename = event.tablename;
  if (tablename == "" || tablename == undefined || tablename == null) {
    tablename = "users";
  }

  dynamoClient.scan({ TableName: tablename }, (err, result) => {
    if (err) {
      callback(null, {
        statusCode: 500,
        headers: { "Content-Type": "text/plain" },
        body: "error getting users"
      });
      return;
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(
        { sessionID: Math.floor(1000 + Math.random() * 9000).toString() },
        result.Items
      )
    });
  });
};
