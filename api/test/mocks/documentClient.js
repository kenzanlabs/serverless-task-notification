/* istanbul ignore file */
'use strict';

class db {
  constructor(params) {
    this.params = params;
  }
  promise() {
    if (!this.params.Tablename) return Promise.reject('error');
    return Promise.resolve({
      Items: { key: 'value' },
      Item: { key: 'value' }
    });
  }
}

module.exports = {
  scan: params => {
    return new db(params);
  },
  get: params => {
    return new db(params);
  },
  delete: params => {
    return new db(params);
  },
  put: params => {
    return new db(params);
  }
};
