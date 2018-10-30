'use strict';

const axios = require('axios').default;

const get = api => {
  axios
    .get(api)
    .then(result => {
      return result.data;
    })
    .catch(err => {
      return console.log(err);
    });
};

const post = (clientID, taskID) => {
  let url = `http://${process.env.SocketDNS}:${9000}/notifications`;
  return axios.post(url, { clientID: clientID, taskID: taskID });
};

module.exports = { get, post };
