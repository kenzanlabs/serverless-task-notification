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
              phone: '12345',
              email: 'email@email.com'
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: '1',
              name: 'Scott',
              email: 'anotheremail@email.com',
              phone: '67890'
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: '2',
              name: 'Luis',
              email: 'yetanotheremail@email.com'
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: '3',
              name: 'Carlos',
              phone: '987654321'
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: '4',
              name: 'Jacob'
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
