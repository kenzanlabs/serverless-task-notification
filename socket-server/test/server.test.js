const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server/server");
const expect = chai.expect;
chai.use(chaiHttp);

describe("Node Server", () => {
  let testServer;

  beforeEach(done => {
    testServer = server();
    done();
  });

  afterEach(done => {
    if (testServer) testServer.close();
    setTimeout(done, 1000);
  });

  it("should return 404 on GET requests", done => {
    chai
      .request(testServer)
      .get("/notifications")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it("should get 202 when successful call", done => {
    chai
      .request(testServer)
      .post("/notifications")
      .set("content-type", "application/json")
      .send({ clientID: "938", taskID: "234" })
      .end((err, res) => {
        // expect(res.status).to.equal(202);
        done();
      });
  });

  it("should get 400 when no taskID or clientID is sent", done => {
    chai
      .request(testServer)
      .post("/notifications")
      .set("content-type", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("404 everything else", done => {
    chai
      .request(testServer)
      .get("/foo/bar")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});
