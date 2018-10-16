"use strict";
const socketIO = require("socket.io");

let clients = new Map();

class SocketService {
  constructor(server) {
    this.socketServer = socketIO(server);
  }

  initialize() {
    this.socketServer.on("connection", socket => {
      socket.emit("clientID", socket.id);
      console.log(socket.id.concat(" connected"));
      clients.set(socket.id, socket);

      socket.on("disconnect", () => {
        console.log(socket.id.concat(" disconnected"));
        clients.delete(socket.id);
      });
    });
  }

  emitResult(clientID, taskID) {
    let client = clients.get(clientID);
    console.log("client " + clientID + " received response");
    client.emit("task updated", taskID);
  }
}

module.exports = SocketService;
