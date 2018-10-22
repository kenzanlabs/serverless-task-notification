import SocketService from '../../server/services/socket.service';

const { expect } = require('chai');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');

// const SocketService = require('../../server/services/socket.service.ts');

// chai.should();
// chai.use(sinonChai);

describe('SocketService', () => {
  let testService: SocketService;
  const mockServer: any = {
    on: (a: any, b: any) => {
    },
  };

  beforeEach(() => {
    testService = new SocketService(mockServer);
  });

  it('should attach socket.io to server', () => {
    console.log(`socketServer >>>`, testService.prototype);
    expect(testService).not.to.be.undefined;
    // expect(testService.initialize).to.be.a.function;
  });

  // it('should have a "initialize" method', () => {
  //   expect(testService.initialize).not.to.be.undefined;
  //   expect(testService.initialize).to.be.a.function;
  // });
  //
  // it('should have a "emitResult" method', () => {
  //   console.log(testService);
  //
  //   expect(true).to.be.false;
  // });

  // it('should attach socket.IO to current class', () => {
  //   const socket = testService.socketServer;
  //   socket.should.not.be.undefined;
  //   socket.should.not.be.null;
  // });
  //
  // it('should have an "initialize" method', () => {
  //   const initialize = testService.initialize;
  //   initialize.should.not.be.undefined;
  //   initialize.should.not.be.null;
  //   initialize.should.be.a("function");
  // });
  //
  // describe('initialize method', () => {
  //   it('should call "server.socket.on"', done => {
  //     const spy = sinon.spy(testService.socketServer, "on");
  //
  //     spy.called.should.be.false;
  //
  //     testService.initialize();
  //
  //     spy.should.have.been.calledOnce;
  //     spy.should.have.been.calledWithMatch("connection");
  //
  //     done();
  //   });
  // });
});
