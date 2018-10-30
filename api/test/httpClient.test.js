'use strict';

const httpClient = require('../services/httpClient');

test('should post', () => {
  expect(httpClient.post('test')).resolves.toBeTruthy();
});

test('should get', () => {
  expect(httpClient.get('test')).toBeTruthy();
});
