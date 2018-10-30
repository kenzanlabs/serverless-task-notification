'use strict';

const AWS = require('aws-sdk');
const SNS = new AWS.SNS();

const sms = (phoneNumber, msg) => {
  if (!phoneNumber || !msg) return;
  return SNS.publish({ PhoneNumber: phoneNumber, Message: msg }).promise();
};

const publish = (topicArn, msg) => {
  if (!topic || !msg) return;
  return SNS.publish({ TopicArn: topicArn, Message: msg }).promise();
};

module.exports = { sms, publish };
