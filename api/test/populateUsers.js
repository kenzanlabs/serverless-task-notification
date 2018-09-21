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
                id: "1",
                name: "Scott",
                email: "scott@email.com",
                phone: 1234568975
              }
            }
          },
          {
            PutRequest: {
              Item: {
                id: "2",
                name: "Luis",
                email: "luis@email.com"
              }
            }
          },
          {
            PutRequest: {
              Item: {
                id: "3",
                name: "Carlos",
                phone: 5486689475
              }
            }
          }
        ]
      }
    },
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}
