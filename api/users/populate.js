'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const DocumentClient = new AWS.DynamoDB.DocumentClient();
DocumentClient.batchWrite(
  {
    RequestItems: {
      users: [
        {
          PutRequest: {
            Item: {
              id: '0',
              name: 'Elana',
              phone: process.env.ELANA_PHONE,
              email: process.env.ELANA_EMAIL
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: '1',
              name: 'Scott',
              email: process.env.SCOTT_EMAIL,
              phone: process.env.SCOTT_PHONE
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: '2',
              name: 'Luis'
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: '3',
              name: 'Carlos'
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: '4',
              name: 'Jacob',
              email: process.env.JACOB_EMAIL,
              phone: process.env.JACOB_PHONE
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: '5',
              name: 'Andrea'
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: '6',
              name: 'Jeremy'
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: '7',
              name: 'Kate'
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
