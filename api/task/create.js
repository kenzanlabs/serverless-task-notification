'use strict';

const shortid = require('shortid');
const messaging = require('../services/messaging');
const dynamo = require('../services/dynamo');

module.exports.handler = (event, context, callback) => {
  let newTask;

  try {
    let requestBody = JSON.parse(event.body);
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

  dynamo
    .putItem(process.env.TABLENAME, newTask)
    .then(result => {
      messaging
        .send(
          'topic',
          process.env.TOPIC + ':newTask',
          newTask.clientID.concat(',' + newTask.id)
        )
        .catch(err => {
          console.log(err);
        });
      callback(null, {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: newTask.id
      });
    })
    .catch(err => {
      console.log(err);
    });
};
