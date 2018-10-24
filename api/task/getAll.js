'use strict';

const AWS = require('aws-sdk');
const DocumentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  DocumentClient.scan({ TableName: process.env.TABLENAME }, (err, result) => {
    if (err) return console.log(error);
    callback(null, {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(result.Items)
    });
  });
};
