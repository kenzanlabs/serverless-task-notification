/* istanbul ignore file */
'use strict';

module.exports = {
  get: params => {
    if (!params) {
      return Promise.reject('error');
    }
    return Promise.resolve({ data: 'success' });
  },
  post: params => {
    if (!params) {
      return Promise.reject('error');
    }
    return Promise.resolve('success');
  }
};
