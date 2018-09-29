"use strict";
const socketIO = require('socket.io');

const TASK_ARRAY = [
  { id: '62c9a4c0-cb3d-4ea2-81ed-80c38ba5859d',
  status: 'not-sent',
  user: 'Joe',
  task: 'Do Homework' }
];

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

      socket.on('register task', (task) => {
        registerTask(task);
      });

      socket.on('update task', (task) => {
        const updatedTask = updateTask(task);

        console.log('server updating task', task)

        broadcastUpdate(socket, updatedTask);
      });
    });
  }
}

// Possible update to promise base if accessing any outside resources
function registerTask(task) {
  console.log("CREATING NEW TASK INTO ARRAY", task);
  console.log(task.status)
  TASK_ARRAY.push(task);
}

function updateTask(task) {
  const local_task = TASK_ARRAY.find(item => item.id === task.id)

  if(!local_task) return;

  local_task.status = task.status;

  return local_task;
}

function broadcastUpdate(socket, packet) {

  console.log("broadcasting task update", packet);
  socket.emit('task updated', packet)
}

module.exports = SocketService;



