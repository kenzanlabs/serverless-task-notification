'use strict';

const AWS = require('aws-sdk');
const DocumentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  DocumentClient.delete(
    { TableName: process.env.TABLENAME, Key: { id: event.pathParameters.id } },
    err => {
      if (err) return console.log(err);
      callback(null, {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }
  );
};
