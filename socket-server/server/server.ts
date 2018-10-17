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
  private port: string | number;
  private io: SocketService;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  config = (): void =>  {
    this.port = process.env.PORT || SocketServer.PORT;
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
    this.server.listen(this.port, () => console.log('Running server on port %s', this.port));
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
}
