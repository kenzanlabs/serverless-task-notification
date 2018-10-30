'use strict';

const httpClient = require('../services/httpClient');

test('should post', () => {
  expect(httpClient.post('test')).resolves.toBeTruthy();
});

test('should get', () => {
  expect(httpClient.get('test')).resolves.toBeTruthy();
});

test('should not post', () => {
  expect(httpClient.post()).rejects.toBeTruthy();
});

test('should not get', () => {
  expect(httpClient.get()).rejects.toBeTruthy();
});
