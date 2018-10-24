'use strict';

const AWS = require('aws-sdk');
const DocumentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = event => {
  const taskID = event.Records[0].Sns.Message;
  DocumentClient.get(
    {
      TableName: process.env.TABLENAME,
      Key: { id: taskID }
    },
    (err, result) => {
      if (err) return console.log(err);
      result.Item.complete = true;
      DocumentClient.put(
        { TableName: process.env.TABLENAME, Item: result.Item },
        err => {
          if (err) return console.log(err);
        }
      );
    }
  );
};
