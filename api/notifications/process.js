"use strict";
const notificationService = require('./notification.service');
const AWS_Service = require('./../services/AWS.service');

module.exports.handler = event => {
  const taskID = event.Records[0].Sns.Message;
  const {TasksAPI, UsersAPI} = process.env;

  if(TasksAPI && UsersAPI && taskID) {
    notificationService.fetchFromAPI(TasksAPI, 'tasks')
      .then(tasks => {
        const task = notificationService.findByID(tasks,'taskID', taskID);

        if(task) {
          notificationService.fetchFromAPI(UsersAPI, 'users')
            .then(users => {
              return notificationService.findByID(users, 'id', task.contactID);
            })
            .then(user => {
              if(user) {
                const msg = `Hey ${user.name}, \n ${task.body}`;

                if (task.type == "email" || task.type == "both") {
                  AWS_Service.emailUser(user.email, msg);
                }
                if (task.type == "sms" || task.type == "both") {
                  AWS_Service.smsUser(user.phone, msg);
                }

                AWS_Service.postResults(taskID);
              }
            })
        }

      })

  }
}