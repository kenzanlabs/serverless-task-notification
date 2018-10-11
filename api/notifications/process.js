"use strict";
const notificationService = require("./notification.service");
const AWS_Service = require("./AWS.service");

module.exports.handler = event => {
  const snsMessage = event.Records[0].Sns.Message;
  const clientAndTaskIDs = snsMessage.split(",");
  const clientID = clientAndTaskIDs[0];
  const taskID = clientAndTaskIDs[1];
  const { TasksAPI, UsersAPI } = process.env;

  if (TasksAPI && UsersAPI && taskID && clientID) {
    notificationService.fetchFromAPI(TasksAPI, "tasks").then(tasks => {
      const task = notificationService.findByID(tasks, "id", taskID);
      if (task) {
        notificationService
          .fetchFromAPI(UsersAPI)
          .then(users => {
            return notificationService.findByID(users, "id", task.contactID);
          })
          .then(user => {
            console.log("USER FOUND", user);

            if (user) {
              const msg = `Hey ${user.name}, \n ${task.body}`;
              if (task.type == "email" || task.type == "both") {
                AWS_Service.emailUser(user.email, msg).then(res => {
                  console.log("email Sent", res);
                });
              }
              if (task.type == "sms" || task.type == "both") {
                AWS_Service.smsUser(user.phone, msg).then(res => {
                  console.log("sms Sent", res);
                });
              }
              AWS_Service.postResults(clientID, taskID).then(res => {
                console.log("posted", res);
              });

              AWS_Service.taskCompleted(taskID).then(res => {
                console.log("task marked complete", res);
              });
            }
          });
      }
    });
  }
};
