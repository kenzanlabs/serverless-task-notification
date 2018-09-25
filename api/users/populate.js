/* istanbul ignore file */
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
                email: "jnerney@kenzan.com",
                phone: "+14014306957"
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
                phone: "+12345678"
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
