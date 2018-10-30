'use strict';

const messaging = require('../services/messaging');
const httpClient = require('../services/httpClient');

module.exports.handler = event => {
  let clientAndTaskIDs = event.Records[0].Sns.Message.split(',');
  let clientID = clientAndTaskIDs[0];
  let taskID = clientAndTaskIDs[1];
  let { TasksAPI, UsersAPI } = process.env;

  if (TasksAPI && UsersAPI && taskID && clientID) {
    let tasks = httpClient.get(TasksAPI);
    if (tasks) {
      let task = tasks.find(i => i['id'] == taskID);
      let users = httpClient.get(UsersAPI);
      if (users) {
        let user = users.find(i => i['id'] == task.contactID);
        let msg = `Hey ${user.name}, \n ${task.body}`;
        if (task.type == 'email' || task.type == 'both') {
          messaging.send('email', user.email, msg).then(res => {
            console.log('email sent');
          });
        }
        if (task.type == 'sms' || task.type == 'both') {
          messaging.send('sms', user.phone, msg).then(res => {
            console.log('sms sent');
          });
        }
        httpClient.post(clientID, taskID).then(res => {
          console.log('results posted');
        });
        messaging
          .send('topic', process.env.TOPIC + ':taskComplete', taskID)
          .then(res => {
            console.log('task complete');
          });
      }
    }
  }
};
