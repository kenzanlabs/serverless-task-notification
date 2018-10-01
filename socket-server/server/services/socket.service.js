"use strict";
const socketIO = require('socket.io');

class SocketService {
  constructor(server) {
    this.socket = socketIO(server);
  }

  initialize() {
    this.socket.on('connection', socket => {
      console.log('User connected')

      socket.on('disconnect', () => {
        console.log('user disconnected')
      });
    });
  }

  broadcastTaskUpdateByID(taskID) {
    this.socket.emit('task updated',  taskID)
  }
}

module.exports = SocketService;



