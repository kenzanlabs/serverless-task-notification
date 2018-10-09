// This does the work of parsing the cloudformation stack exports for use in the FE build

const fs = require("fs");
const config = require("../config.json");

// the environment variable scripts will be eval'd at the end of the get-env.sh scripts that calls this
let SocketDNS = "export SOCKET_DNS=";
let ReactSocket = "export REACT_APP_SOCKET_DNS=http://";
let UsersAPI = "export REACT_APP_USERS_API=";
let TasksAPI = "export REACT_APP_TASKS_API=";

// create file to hold environment vars
fs.writeFileSync("config.txt", "");

// go through cloudformation results setting vars as needed
let exportsArray = config.Exports;
let i = 0;
for (i; i < exportsArray.length; i++) {
  if (exportsArray[i].Name == "SocketDNS") {
    console.log("setting SocketDNS...");
    let dns = exportsArray[i].Value;
    fs.appendFileSync("config.txt", ReactSocket.concat(dns + ":9000\n"));
    fs.appendFileSync("config.txt", SocketDNS.concat(dns + "\n"));
  }
  if (exportsArray[i].Name == "UsersAPI") {
    console.log("setting UsersAPI...");
    fs.appendFileSync(
      "config.txt",
      UsersAPI.concat(exportsArray[i].Value + "\n")
    );
  }
  if (exportsArray[i].Name == "TasksAPI") {
    console.log("setting TasksAPI...");
    fs.appendFileSync(
      "config.txt",
      TasksAPI.concat(exportsArray[i].Value + "\n")
    );
  }
}
