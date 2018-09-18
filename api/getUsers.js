"use strict";

import { DynamoDB } from "aws-sdk";

export function get(event, context, callback) {
  let dynamo = new DynamoDB.DocumentClient();
  dynamo.scan({ TableName: "users" }, (err, result) => {
    if (err) {
      console.log(err);
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "error getting users"
      });
      return;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
    callback(null, response);
  });
}
