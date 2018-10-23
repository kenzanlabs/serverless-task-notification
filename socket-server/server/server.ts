import { createServer, Server } from 'http';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { SocketService } from './services';

declare global {
  namespace Request {
    interface body { // tslint:disable-line
      clientID: string;
      taskID: string;
    }
  }
}

export default class SocketServer {
  public static readonly PORT = 9000;
  private app: express.Application;
  private server: Server;
  private _port: string | number; // tslint:disable-line
  private io: SocketService;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  config = (): void =>  {
    this._port = Number(process.env.PORT) || SocketServer.PORT;
  }

  createApp = (): void =>  {
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.setRoutes();
  }

  setRoutes = (): void => {
    this.app.route('/notifications').post(this.postNotificationHandler);
  }

  createServer = (): void =>  {
    this.server = createServer(this.app);
  }

  sockets = (): void => {
    this.io = new SocketService(this.server);
    this.io.initialize();
  }

  listen = (): void => {
    this.server.listen(this._port, () => console.log(`Running server on port ${this._port}`));
  }

  postNotificationHandler = (req: Request, res: Response): Response => {
    const { clientID, taskID } = req.body;
    const validPost = clientID && taskID;

    if (validPost) this.io.emitResult(clientID, taskID);

    return res.sendStatus(validPost ? 202 : 400);
  }

  getApp = (): express.Application =>  {
    return this.app;
  }

  getServer = () : Server  => {
    return this.server;
  }

  get port(): string | number {
    return this._port;
  }
}
