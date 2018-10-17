import { Server } from 'http';
import socketIo from 'socket.io';

const clients: Map<string, any> = new Map();

export default class SocketService {
  private socketServer: socketIo.Server;

  constructor(server: Server) {
    this.socketServer = socketIo(server);
  }

  initialize = (): void => {
    this.socketServer.on('connection', (socket) => {
      socket.emit('clientID', socket.id);
      console.log(`${socket.id} connected`);
      clients.set(socket.id, socket);

      socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
        clients.delete(socket.id);
      });
    });
  }

  emitResult = (clientID: string, taskID: string): void  => {
    const client = clients.get(clientID);

    if (client) {
      console.log(`Client ${ clientID } received response`);
      client.emit('task updated', taskID);
    }
  }
}
