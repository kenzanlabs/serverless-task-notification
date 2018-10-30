'use strict';

const messaging = require('../services/messaging');

test('should publish to topic', () => {
  expect(messaging.send('topic', 'test', 'params')).resolves.toBeTruthy();
});

test('should send sms', () => {
  expect(messaging.send('sms', 'test', 'params')).resolves.toBeTruthy();
});

test('should send email', () => {
  expect(messaging.send('email', 'test', 'params')).resolves.toBeTruthy();
});

test('should not publish to topic', () => {
  expect(messaging.send('topic')).rejects.toBeTruthy();
});

test('should not send sms', () => {
  expect(messaging.send('sms')).rejects.toBeTruthy();
});

test('should not send email', () => {
  expect(messaging.send('email')).rejects.toBeTruthy();
});
