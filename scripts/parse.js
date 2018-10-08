const fs = require("fs");
const config = require("../config.json");

let SocketDNS = "export REACT_APP_SOCKET_DNS=http://";
let UsersAPI = "export REACT_APP_USERS_API=";
let TasksAPI = "export REACT_APP_TASKS_API=";
fs.writeFileSync("config.txt", "");

let i = 0;
for (i; i < config.length; i++) {
  if (config[i].Name == "SocketDNS") {
    console.log("setting SocketDNS...");
    fs.appendFileSync(
      "config.txt",
      SocketDNS.concat(config[i].Value + ":9000\n")
    );
  }
  if (config[i].Name == "UsersAPI") {
    console.log("setting UsersAPI...");
    fs.appendFileSync("config.txt", UsersAPI.concat(config[i].Value + "\n"));
  }
  if (config[i].Name == "TasksAPI") {
    console.log("setting TasksAPI...");
    fs.appendFileSync("config.txt", TasksAPI.concat(config[i].Value + "\n"));
  }
}
