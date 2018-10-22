import * as express from 'express';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import SocketServer from '../server/server';

chai.use(chaiHttp);
chai.use(sinonChai);

describe('Server.ts', () => {
  describe('config', () => {
    let testServer: SocketServer | undefined;

    afterEach(done => {
      if (testServer) testServer.getServer().close();
      testServer = undefined;
      process.env.PORT = undefined;
      setTimeout(done, 1000);
    });

    it('should set the port to "9000", when no PORT environment variable is set', (done) => {
      process.env.PORT = undefined;
      testServer = new SocketServer();

      expect(testServer.port).to.equal(9000);
      done();
    });

    it('should set the port to process.env.PORT, when PORT environment variable is set', (done) => {
      process.env.PORT = '7777';
      testServer = new SocketServer();

      expect(testServer.port).to.equal(7777);
      done();
    });
  });

  describe('createApp', () => {
    let testServer: SocketServer | undefined;
    let app: express.Application;

    beforeEach(done => {
      process.env.PORT = undefined;
      testServer = new SocketServer();
      app = testServer.getApp();
      done();
    });

    afterEach(done => {
      if (testServer) testServer.getServer().close();
      testServer = undefined;
      setTimeout(done, 1000);
    });

    it('GET "/" returns 404', (done) => {
      if (!testServer) return;

      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('GET "/notifications" returns 404', (done) => {
      if (!testServer) return;

      chai.request(app)
        .get('/notifications')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('POST "/notifications" without arguments returns 400', (done) => {
      if (!testServer) return;

      chai.request(app)
        .post('/notifications')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('POST "/notifications" without clientID returns 400', (done) => {
      if (!testServer) return;

      chai.request(app)
        .post('/notifications')
        .send({
          taskID: 'cid2',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('POST "/notifications" without taskID returns 400', (done) => {
      if (!testServer) return;

      chai.request(app)
        .post('/notifications')
        .send({
          clientID: 'cid2',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('POST "/notifications" should succeed with correct arguments', (done) => {
      if (!testServer) return;

      chai.request(app)
        .post('/notifications')
        .send({
          taskID: 'tid1',
          clientID: 'cid2',
        })
        .end((err, res) => {
          expect(res.status).to.equal(202);
          done();
        });
    });
  });

  describe('setRoutes', () => {
    it('should only expose a "/notifications" route', (done) => {
      let testServer: SocketServer | undefined = new SocketServer();
      const app: express.Application = testServer.getApp();

      const availableRoutes = app._router.stack
        .map((r: any) => { if (r && r.route) return r.route.path; })
        .filter((path: string | undefined) => !!path);

      expect(availableRoutes.length).to.equal(1);
      expect(availableRoutes[0]).to.equal('/notifications');

      if (testServer) testServer.getServer().close();
      setTimeout(done, 1000);
    });
  });

  describe('sockets', () => {
    it('should start socket.io', (done) => {
      const testServer: SocketServer | undefined = new SocketServer();
      const httpServer = testServer.getServer();
      const message = 'Socket Connected!';

      httpServer.on('message', (msg) => {
        expect(msg).not.to.be.undefined;
        expect(msg).to.equal(message);

        httpServer.close();
        setTimeout(done, 1000);
      });

      httpServer.emit('message', message);
    });
  });
});
