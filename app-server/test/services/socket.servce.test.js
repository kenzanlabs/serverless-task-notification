const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const io = require('socket.io-client');
const sinon = require('sinon');
// const server = require('../server/server');
const socketService = require('../../server/services/socket.service');

chai.use(chaiHttp);


describe('Socket service', () => {
  let testSocketService;
  let mockServer = {
    on: (i) => (req, res) => {}
  };

  beforeEach(() => {
    testSocketService = new socketService(mockServer)
  });

  it('should attach socketIO to new object', () => {
    expect(testSocketService.socket).not.to.be.undefined;
    expect(testSocketService.socket).not.to.be.null;
  });

  it('should attach an "initialize" method to new object', function () {
    expect(testSocketService.initialize).not.to.be.undefined;
  });

  describe('socketService.initialize method', () => {

    it('should not be null, ', (done) =>  {
      testSocketService.socket.emit('connect', (socket) => {
        console.log(socket, '@@@')

        testSocketService.socket.disconnet()
        done();
      })
    });
  });
});
