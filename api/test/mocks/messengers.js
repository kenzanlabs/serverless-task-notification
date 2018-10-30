/* istanbul ignore file */
'use strict';

class msg {
  constructor(params) {
    this.params = params;
  }
  promise() {
    if (!this.params) return Promise.reject('error');
    return Promise.resolve('success');
  }
}

module.exports = {
  publish: params => {
    return new msg(params);
  },
  sendEmail: params => {
    return new msg(params);
  }
};
