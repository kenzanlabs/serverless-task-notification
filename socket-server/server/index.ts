import SocketServer from './server';

const app: Express.Application = new SocketServer().getApp();
export { app };
