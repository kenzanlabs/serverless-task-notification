'use strict';

const dynamo = require('../services/dynamo');

module.exports.handler = (event, context, callback) => {
  dynamo
    .getAll(process.env.TABLENAME)
    .then(result => {
      callback(null, {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(result.Items)
      });
    })
    .catch(err => {
      console.log(err);
    });
};
