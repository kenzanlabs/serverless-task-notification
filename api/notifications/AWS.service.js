const AWS = require("aws-sdk");
const axios = require("axios");

const SOURCE_EMAIL = "serverlesstasknotification@gmail.com";
const MESSAGE = "New MSG from the Serverless-Task-Notication app!";

const AWS_Service = {
  emailUser: (emailAddress, msg) => {
    if (!emailAddress && !msg) return;
    const sesClient = new AWS.SES();
    const params = {
      Destination: { ToAddresses: [emailAddress] },
      Source: SOURCE_EMAIL,
      Message: {
        Subject: { Data: MESSAGE },
        Body: { Text: { Data: msg } }
      }
    };

    return new Promise(resolve => {
      sesClient.sendEmail(params, (err, data) =>
        resolve(err ? err.message : data)
      );
    });
  },

  smsUser: (phoneNumber, msg) => {
    if (!phoneNumber && !msg) return;

    const snsClient = new AWS.SNS();
    const params = {
      PhoneNumber: phoneNumber,
      Message: msg
    };

    return new Promise((resolve, reject) => {
      snsClient.publish(params, (err, data) => {
        return err ? reject(err.message) : resolve(data);
      });
    });
  },

  taskCompleted: taskID => {
    if (!taskID) return;

    const snsClient = new AWS.SNS();
    const params = {
      TopicArn: "arn:aws:sns:us-east-1:884956725745:taskComplete",
      Message: taskID
    };

    return new Promise(resolve => {
      snsClient.publish(params, (err, data) => {
        resolve(err ? err.message : data);
      });
    });
  },

  postResults: taskID => {
    if (!taskID) return;

    return new Promise(resolve => {
      const newDNS = `http://${process.env.SocketDNS}:${9000}/notifications`;

      axios
        .post(newDNS, { taskID: taskID })
        .then(response => {
          console.log("in then", response.data);
          resolve(response);
        })
        .catch(error => {
          console.log("in error", error.message);
          resolve(error.message);
        });
    });
  }
};

module.exports = AWS_Service;
