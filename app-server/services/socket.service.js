"use strict";

const socketIO = require('socket.io');
const uuid = require('uuidv4');

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

      socket.on('register task', registerTask);

      socket.on('update task', (task) => {
        const updatedTask = updateTask(task);
        broadcastUpdate(socket, updatedTask);

        // Test timeout - remove later
        setTimeout(() => {
          broadcastUpdate(socket, {status: 'sent', task: 'Update to latest message'})
        }, 4000)
      });
    });

  }
}

// Possible update to promise base if accessing any outside resources
function registerTask(task) {
  const _local_task = Object.assign({}, {id: uuid(), status: 'not-sent'}, task)
  TASK_ARRAY.push(_local_task);
}

function updateTask(task) {
  const _local_task = TASK_ARRAY.find(item => item.id === task.id)

  if(!_local_task) return;

  _local_task.status = task.status;

  return _local_task;
}

function broadcastUpdate(socket, packet) {
  socket.emit('task updated', packet)
}


module.exports = SocketService;
