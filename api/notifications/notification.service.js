const axios = require('axios');

const  NotificationService = {
  fetchFromAPI: (API, item) => {
    return axios
      .get(API)
      .then(res => {
        return res.data[item];
      })
      .catch(e => e)
  },
  findByID: (arr, idParam, itemID) => {
    try {
      return arr.find(i => i[idParam] === itemID)
    } catch(e) {
      return e;
    }
  }
}

module.exports = NotificationService;