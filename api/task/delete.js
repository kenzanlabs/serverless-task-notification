'use strict';

const dynamo = require('../services/dynamo');

module.exports.handler = (event, context, callback) => {
  dynamo
    .deleteOne(process.env.TABLENAME, event.pathParameters.id)
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
