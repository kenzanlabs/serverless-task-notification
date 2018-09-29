const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const expect = chai.expect;
const io = require('socket.io-client')

chai.use(chaiHttp);

describe('Node Server', () => {
  let socket;
  let testServer;

  beforeEach((done) => {
    testServer = server();

    socket = io.connect(`http://localhost:9000`, {
      'reconnection delay' : 0
      , 'reopen delay' : 0
      , 'force new connection' : true
    });
    socket.on('connect', () => {
      done();
    });
    socket.on('disconnect', () => {

    })
  });

  afterEach((done) => {
    if(socket.connected) {
      socket.disconnect();
    }

    testServer.close();
    setTimeout(done, 1000);
  });

  after(() => {
    if(testServer) testServer.close();
  })

  it('should start server correctly', (done) => {
    const EXPECTED_SERVER_RESPONSE = 'Connected';

    chai.request(testServer)
      .get('/notifications')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.text).to.equal(EXPECTED_SERVER_RESPONSE);
        done();
      });
  });

  it('should start websocket connection',  () => {
    expect(socket.connected).to.be.true;
  });

  it('404 everything else', (done) => {
    chai.request(testServer)
      .get('/foo/bar')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
})
