"use strict";

const AWS = require("aws-sdk");
const http = require("http");
const https = require("https");

module.exports.handler = event => {
  let snsMessage = event.Records[0].Sns.Message.split(",");
  let sessionID = snsMessage[0];
  let taskID = snsMessage[1];

  https.get(process.env.TasksAPI, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      let tasks = JSON.parse(body);
      let task = {};
      let i;
      for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskID) {
          task = tasks[i];
          break;
        }
      }
      https.get(process.env.UsersAPI, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
          let users = JSON.parse(body).users;
          let user = {};
          let i;
          for (i = 0; i < users.length; i++) {
            if (users[i].id == task.contactID) {
              user = users[i];
            }
          }
          console.log(user);
          let msg = "Hey "
            .concat(user.name)
            .concat(",\n")
            .concat(task.body);
          if (task.type == "email" || task.type == "both") {
            emailUser(user.email, msg);
          }
          if (task.type == "sms" || task.type == "both") {
            smsUser(user.phone, msg);
          }
          postResults(sessionID, taskID);
        });
      });
    });
  });
};

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
      PhoneNumber: phoneNumber,
      Message: msg
    },
    (err, res) => {
      if (err) console.log(err);
    }
  );
}

function postResults(sessionID, taskID) {
  let ec2 = new AWS.EC2();
  ec2.describeInstances(
    { Filters: [{ Name: "tag:Name", Values: ["socketServer"] }] },
    (err, result) => {
      if (err) {
        return console.log(err);
      } else {
        let dns = result.Reservations[0].Instances[0].PublicDnsName;
        if (!instance) {
          dns = result.Reservations[1].Instances[0].PublicDnsName;
        }
        const req = http.request({
          hostname: dns,
          post: 1337,
          path: "/notifications",
          method: "POST"
        });
        req.on("error", e => {
          return console.log(e);
        });
        req.write(
          JSON.stringify({
            sessionID: sessionID,
            taskID: taskID
          })
        );
      }
    }
  );
}
