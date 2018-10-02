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
                id: "0",
                name: "Elana",
                phone: process.env.ELANA_PHONE
              }
            }
          },
          {
            PutRequest: {
              Item: {
                id: "1",
                name: "Scott",
                email: process.env.SCOTT_EMAIL,
                phone: process.env.SCOTT_PHONE
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
                phone: "+15027591445"
              }
            }
          },
          {
            PutRequest: {
              Item: {
                id: "4",
                name: "Jacob",
                email: "nern@mail.net",
                phone: "+12709878898"
              }
            }
          },
          {
            PutRequest: {
              Item: {
                id: "5",
                name: "Andrea",
                email: "andreab@internet.org"
              }
            }
          },
          {
            PutRequest: {
              Item: {
                id: "6",
                name: "Jeremy",
                phone: "+19085564765"
              }
            }
          },
          {
            PutRequest: {
              Item: {
                id: "7",
                name: "Kate",
                email: "katie@yahoo.edu",
                phone: "+14452122768"
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
