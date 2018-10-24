const AWS = require('aws-sdk');
const axios = require('axios');

const SOURCE_EMAIL = 'serverlesstasknotification@gmail.com';
const SUBJECT = 'New MSG from the Serverless Task Notification app!';

const SNS = new AWS.SNS();

const AWS_Service = {
  emailUser: (emailAddress, msg) => {
    if (!emailAddress && !msg) return;
    const SES = new AWS.SES();
    const params = {
      Destination: { ToAddresses: [emailAddress] },
      Source: SOURCE_EMAIL,
      Message: {
        Subject: { Data: SUBJECT },
        Body: { Text: { Data: msg } }
      }
    };

    return new Promise(resolve => {
      SES.sendEmail(params, (err, data) => resolve(err ? err.message : data));
    });
  },

  smsUser: (phoneNumber, msg) => {
    if (!phoneNumber || !msg) return;
    const params = {
      PhoneNumber: phoneNumber,
      Message: msg
    };

    return new Promise((resolve, reject) => {
      SNS.publish(params, (err, data) => {
        return err ? reject(err.message) : resolve(data);
      });
    });
  },

  taskCompleted: taskID => {
    if (!taskID) return;
    const params = {
      TopicArn: process.env.TOPIC + ':taskComplete',
      Message: taskID
    };

    return new Promise(resolve => {
      SNS.publish(params, (err, data) => {
        resolve(err ? err.message : data);
      });
    });
  },

  postResults: (clientID, taskID) => {
    if (!(taskID && clientID)) return;

    return new Promise(resolve => {
      const newDNS = `http://${process.env.SocketDNS}:${9000}/notifications`;

      axios
        .post(newDNS, { clientID: clientID, taskID: taskID })
        .then(response => {
          console.log('in then', response.data);
          resolve(response);
        })
        .catch(error => {
          console.log('in error', error.message);
          resolve(error.message);
        });
    });
  }
};

module.exports = AWS_Service;
