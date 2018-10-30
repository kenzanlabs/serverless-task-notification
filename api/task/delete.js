'use strict';

const dynamo = require('../services/dynamo');

module.exports.handler = (event, context, callback) => {
  let id;
  try {
    id = event.pathParameters.id;
  } catch (err) {
    return console.log(err);
  }
  dynamo
    .deleteOne(process.env.TABLENAME, id)
    .then(result => {
      callback(null, {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    })
    .catch(err => {
      console.log(err);
    });
};
