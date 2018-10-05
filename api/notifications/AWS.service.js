const AWS = require("aws-sdk");
const axios = require('axios');

const SOURCE_EMAIL = "serverlesstasknotification@gmail.com";
const MESSAGE = "New MSG from the Serverless-Task-Notication app!" ;

const AWS_Service = {
  emailUser: (emailAddress, msg) =>  {
    if(!emailAddress && !msg) return;
    const sesClient = new AWS.SES();
    const params = {
      Destination: { ToAddresses: [emailAddress] },
      Source: SOURCE_EMAIL,
      Message: {
        Subject: { Data:MESSAGE},
        Body: { Text: { Data: msg } }
      }
    };

    return new Promise(resolve => {
      sesClient.sendEmail(params, (err, data) => resolve(err ?  err.message : data));
    })
  },

  smsUser: (phoneNumber, msg) =>  {
    if(!phoneNumber && !msg) return;

    const snsClient = new AWS.SNS();
    const params = {
      PhoneNumber: phoneNumber,
      Message: msg
    };

    return new Promise(resolve => {
      snsClient.publish(params, (err, data) => resolve(err ?  err.message : data));
    })
  },

  postResults : (taskID)  => {
    if(!taskID) return;

    const ec2 = new AWS.EC2();
    const params = {
      Filters: [
        {
          Name: "tag:Name",
          Values: ["socketServer"]
        }
      ]
    };

    return new Promise(resolve => {
      ec2.describeInstances(params, (err, result) => {
        if(err)
          resolve(err.message);

        const dns = result.Reservations[0].Instances[0].PublicDnsName || result.Reservations[1].Instances[0].PublicDnsName;
        const newDNS = `//${dns}:${9000}/notifications`;

        // This call fails, "ECONNREFUSED 127.0.0.1:80"
        axios.post(newDNS, {taskID: taskID})
          .then((response) => {
            resolve(response);
          })
          .catch((error)  =>{
            resolve(error.message)
          });
        }
      );
    });
  }
}

module.exports = AWS_Service;