'use strict';
const notificationService = require('./notification.service');
const AWS_Service = require('./AWS.service');

module.exports.handler = event => {
  const clientAndTaskIDs = event.Records[0].Sns.Message.split(',');
  const clientID = clientAndTaskIDs[0];
  const taskID = clientAndTaskIDs[1];
  const { TasksAPI, UsersAPI } = process.env;

  if (TasksAPI && UsersAPI && taskID && clientID) {
    notificationService.fetchFromAPI(TasksAPI, 'tasks').then(tasks => {
      const task = notificationService.findByID(tasks, 'id', taskID);
      if (task) {
        notificationService
          .fetchFromAPI(UsersAPI)
          .then(users => {
            return notificationService.findByID(users, 'id', task.contactID);
          })
          .then(user => {
            if (user) {
              const msg = `Hey ${user.name}, \n ${task.body}`;
              if (task.type == 'email' || task.type == 'both') {
                AWS_Service.emailUser(user.email, msg).then(res => {
                  console.log('email sent');
                });
              }
              if (task.type == 'sms' || task.type == 'both') {
                AWS_Service.smsUser(user.phone, msg).then(res => {
                  console.log('sms sent');
                });
              }
              AWS_Service.postResults(clientID, taskID).then(res => {
                console.log('results posted');
              });

              AWS_Service.taskCompleted(taskID).then(res => {
                console.log('task complete');
              });
            }
          });
      }
    });
  }
};
