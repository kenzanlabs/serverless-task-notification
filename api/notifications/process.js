"use strict";
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = event => {
  let ids = event.Records[0].Sns.Message.split(",");
  let taskID = ids[1];

  beginProcessing(taskID);
  postToInstance(ids[0], taskID);
};

function beginProcessing(taskID) {
  dynamoClient.get(
    { TableName: "tasks", Key: { HashKey: taskID } },
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else {
        processTask(result.Item);
      }
    }
  );
}

function processTask(task) {
  dynamoClient.get(
    {
      Tablename: "users",
      Key: { HashKey: task.contactID }
    },
    (e, res) => {
      if (e) {
        console.log(e);
        return;
      } else {
        let user = res.Item;
        if (task.type == "email") {
          emailUser(user.email, task.body);
          return;
        }
        if (task.type == "sms") {
          smsUser(user.phone, task.body);
          return;
        }
      }
    }
  );
}

function emailUser(emailAddress, msg) {
  let sesClient = new AWS.SES();
  sesClient.sendEmail(
    {
      Destination: { ToAddresses: [emailAddress] },
      Source: "serverlesstasknotification@gmail.com",
      Message: {
        Subject: { Data: "New MSG from the Serverless-Task-Notication app!" },
        Body: { Text: { Data: msg } }
      }
    },
    (err, res) => {
      if (err) console.log(err);
    }
  );
}

function smsUser(phoneNumber, msg) {
  let snsClient = new AWS.SNS();
  snsClient.publish(
    {
      TopicArn: "arn:aws:sns:us-east-1:884956725745:sendMessage",
      PhoneNumber: phoneNumber,
      Message: msg
    },
    (err, res) => {
      if (err) console.log(err);
    }
  );
}

function postToInstance(sessionID, taskID) {
  let ec2 = new AWS.EC2();
  ec2.describeInstances(
    { Filters: [{ Name: "tag:Name", Values: ["socketServer"] }] },
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else {
        let instance = result.Reservations[0].Instances[0].PublicDnsName;
        if (!instance) {
          instance = result.Reservations[1].Instances[0].PublicDnsName;
        }
        console.log(instance);
        console.log(sessionID + " - " + taskID);
      }
    }
  );
}
