'use strict';

const dynamo = require('../services/dynamo');

module.exports.handler = async event => {
  const taskID = event.Records[0].Sns.Message;

  dynamo.getOne(process.env.TABLENAME, taskID).then(result => {
    result.Item.complete = true;
    dynamo.putItem(process.env.TABLENAME, result.Item).catch(err => {
      return console.log(err);
    });
  });
};
