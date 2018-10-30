'use strict';

const AWS = require('aws-sdk');
let DocumentClient = new AWS.DynamoDB.DocumentClient();

/* istanbul ignore next */
if (process.env.NODE_ENV == 'development') {
  DocumentClient = require('../test/mocks/documentClient');
}

const getAll = tablename => {
  return DocumentClient.scan({ Tablename: tablename }).promise();
};

const getOne = (tablename, id) => {
  return DocumentClient.get({
    Tablename: tablename,
    Key: { id: id }
  }).promise();
};

const putItem = (tablename, item) => {
  return DocumentClient.put({ TableName: tablename, Item: item }).promise();
};

const deleteOne = (tablename, id) => {
  return DocumentClient.delete({
    TableName: tablename,
    Key: { id: id }
  }).promise();
};

module.exports = { getAll, getOne, putItem, deleteOne };
