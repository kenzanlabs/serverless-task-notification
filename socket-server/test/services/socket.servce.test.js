const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");

const SocketService = require('../../server/service/socket.service.js');

chai.should();
chai.use(sinonChai);

describe('SocketService', () => {
  let testService;
  const mockServer = {
    on: (a, b) => {
    }
  }

  beforeEach(() => {
    testService = new SocketService(mockServer);
  })

  it('should attach socket.IO to current class', () => {
    const socket = testService.socket;
    socket.should.not.be.undefined;
    socket.should.not.be.null;
  })
  ;

  it('should have an "initialize" method', () => {
    const initialize = testService.initialize;

    initialize.should.not.be.undefined;
    initialize.should.not.be.null;
    initialize.should.be.a('function');
  })
  ;

  describe('initialize method', () => {
    it('should call "server.socket.on"', (done) => {
      const spy = sinon.spy(testService.socket, 'on');

      (spy.called).should.be.false;

      testService.initialize();

      spy.should.have.been.calledOnce;
      spy.should.have.been.calledWithMatch('connection');

      done();
    });
  });
});
