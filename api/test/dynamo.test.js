'use strict';

const dynamo = require('../services/dynamo');

test('should getAll', () => {
  expect(dynamo.getAll('test')).resolves.toHaveProperty('Items');
});

test('should getOne', () => {
  expect(dynamo.getOne('test')).resolves.toHaveProperty('Item');
});

test('should put', () => {
  expect(dynamo.putItem('test')).resolves.toBeTruthy();
});

test('should delete', () => {
  expect(dynamo.deleteOne('test')).resolves.toBeTruthy();
});

test('should not getAll', () => {
  expect(dynamo.getAll()).rejects.toBeTruthy();
});

test('should not getOne', () => {
  expect(dynamo.getOne()).rejects.toBeTruthy();
});

test('should not put', () => {
  expect(dynamo.putItem()).rejects.toBeTruthy();
});

test('should not delete', () => {
  expect(dynamo.deleteOne()).rejects.toBeTruthy();
});
