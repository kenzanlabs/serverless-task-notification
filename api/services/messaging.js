'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES();
const SNS = new AWS.SNS();

const SOURCE_EMAIL = 'serverlesstasknotification@gmail.com';
const SUBJECT = 'New MSG from the Serverless Task Notification app!';

const sendSMS = (phoneNumber, msg) => {
  if (!phoneNumber || !msg) return;
  return SNS.publish({ PhoneNumber: phoneNumber, Message: msg }).promise();
};

const publishToTopic = (topicArn, msg) => {
  if (!topic || !msg) return;
  return SNS.publish({ TopicArn: topicArn, Message: msg }).promise();
};

const sendEmail = (emailAddress, msg) => {
  if (!emailAddress || !msg) return;
  let params = {
    Destination: { ToAddresses: [emailAddress] },
    Source: SOURCE_EMAIL,
    Message: {
      Subject: { Data: SUBJECT },
      Body: { Text: { Data: msg } }
    }
  };
  return SES.sendEmail(params).promise();
};

module.exports.send = (type, target, msg) => {
  if (type == 'sms') return sendSMS(target, msg);
  if (type == 'topic') return publishToTopic(target, msg);
  if (type == 'email') return sendEmail(target, msg);
};
