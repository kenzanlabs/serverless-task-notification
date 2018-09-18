"use strict";

const aws = require("aws-sdk");

module.exports.get = (event, context, callback) => {
  let dynamo = new aws.DynamoDB.DocumentClient();
  dynamo.scan({ TableName: "users" }, (err, result) => {
    if (err) {
      console.log(err);
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "application/json" },
        body: { message: "error getting users" }
      });
      return;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
    callback(null, response);
  });
};
