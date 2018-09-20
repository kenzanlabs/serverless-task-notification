"use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoClient = new AWS.DynamoDB.DocumentClient();

populateTasks();
function populateTasks() {
  console.log("populating tasks table...");
  dynamoClient.batchWrite(
    {
      RequestItems: {
        tasks: [
          {
            PutRequest: {
              Item: {
                id: "0",
                contactID: "1",
                type: "sms",
                body: "hello phone"
              }
            }
          },
          {
            PutRequest: {
              Item: {
                id: "1",
                contactID: "1",
                type: "email",
                body: "hello email"
              }
            }
          }
        ]
      }
    },
    err => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log("table populated");
      }
    }
  );
}
