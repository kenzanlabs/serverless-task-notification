'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES();

const SOURCE_EMAIL = 'serverlesstasknotification@gmail.com';
const SUBJECT = 'New MSG from the Serverless Task Notification app!';

module.exports.sendEmail = (emailAddress, msg) => {
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
