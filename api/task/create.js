'use strict';

const AWS = require('aws-sdk');
const shortid = require('shortid');
const DocumentClient = new AWS.DynamoDB.DocumentClient();
const SNS = new AWS.SNS();

module.exports.handler = (event, context, callback) => {
  let newTask;

  try {
    const requestBody = JSON.parse(event.body);
    newTask = {
      id: shortid.generate(),
      clientID: requestBody.clientID,
      contactID: requestBody.contactID,
      type: requestBody.type,
      body: requestBody.body
    };
  } catch (err) {
    return console.log(err);
  }

  DocumentClient.put(
    { TableName: process.env.TABLENAME, Item: newTask },
    err => {
      if (err) return console.log(err);

      SNS.publish(
        {
          TopicArn: process.env.TOPIC + ':newTask',
          Message: newTask.clientID.concat(',' + newTask.id)
        },
        (err, res) => {
          if (err) console.log(err);
        }
      );

      callback(null, {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: newTask.id
      });
    }
  );
};
