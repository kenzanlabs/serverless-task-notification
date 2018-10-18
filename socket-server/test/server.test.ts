import {expect} from 'chai';
// import { Server } from 'http'
// import sinon from 'sinon';
// import * as express from 'express';
import SocketServer from "../server/server";
// const chaiHttp = require("chai-http");
// chai.use(chaiHttp);
describe('Server.ts', () => {
  describe('constructor', () => {
    let testServer: SocketServer | undefined;

    beforeEach(done => {
      process.env.PORT = undefined;
      testServer = new SocketServer();
      done();
    });

    afterEach(done => {
      if (testServer) testServer.getServer().close();
      testServer = undefined;
      setTimeout(done, 1000);
    });

    it('should pass', () => {
      if (!testServer) return;

      expect(testServer.port).to.equal(9000);
    });
  })

  describe('config method', () => {
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
});
// describe("Node Server", () => {
//   let testServer;
//
//   beforeEach(done => {
//     testServer = server();
//     done();
//   });
//
//   afterEach(done => {
//     if (testServer) testServer.close();
//     setTimeout(done, 1000);
//   });
//
//   it("should return 404 on GET requests", done => {
//     chai
//       .request(testServer)
//       .get("/notifications")
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         done();
//       });
//   });
//
//   it("should get 202 when successful call", done => {
//     chai
//       .request(testServer)
//       .post("/notifications")
//       .set("content-type", "application/json")
//       .send({ clientID: "938", taskID: "234" })
//       .end((err, res) => {
//         // expect(res.status).to.equal(202);
//         done();
//       });
//   });
//
//   it("should get 400 when no taskID or clientID is sent", done => {
//     chai
//       .request(testServer)
//       .post("/notifications")
//       .set("content-type", "application/json")
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         done();
//       });
//   });
//
//   it("404 everything else", done => {
//     chai
//       .request(testServer)
//       .get("/foo/bar")
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         done();
//       });
//   });
// });
