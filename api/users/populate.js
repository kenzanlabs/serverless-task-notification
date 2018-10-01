"use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoClient = new AWS.DynamoDB.DocumentClient();

populateUsers();
function populateUsers() {
  dynamoClient.batchWrite(
    {
      RequestItems: {
        users: [
          {
            PutRequest: {
              Item: {
                id: "1234",
                name: "Scott",
                email: "jnerney@kenzan.com", //process.env.SCOTT_EMAIL,
                phone: "+14014306957" //process.env.SCOTT_PHONE
              }
            }
          },
          {
            PutRequest: {
              Item: {
                id: "2345",
                name: "Luis",
                email: "luis@email.com"
              }
            }
          },
          {
            PutRequest: {
              Item: {
                id: "3456",
                name: "Carlos",
                phone: "+15027591445"
              }
            }
          }
        ]
      }
    },
    err => {
      if (err) console.log(err);
    }
  );
}
