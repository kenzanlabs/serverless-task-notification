import SocketService from '../../server/services/socket.service';

const { expect } = require('chai');

describe('SocketService', () => {
  let testService: SocketService;
  const mockServer: any = {
    on: (a: any, b: any) => {
    },
  };

  beforeEach(() => {
    testService = new SocketService(mockServer);
  });

  it('should have a "initialize" method', () => {
    expect(testService.initialize).not.to.be.undefined;
    expect(testService.initialize).to.be.a('function');
  });

  it('should have a "emitResult" method', () => {
    expect(testService.emitResult).not.to.be.undefined;
    expect(testService.emitResult).to.be.a('function');
  });
});
