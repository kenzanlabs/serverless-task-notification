'use strict';

let axios = require('axios').default;

/* istanbul ignore next */
if (process.env.NODE_ENV == 'development') {
  axios = require('../test/mocks/axios');
}

const get = api => {
  return axios.get(api);
};

const post = (clientID, taskID) => {
  let url = `http://${process.env.SocketDNS}:${9000}/notifications`;
  return axios.post(url, { clientID: clientID, taskID: taskID });
};

module.exports = { get, post };
