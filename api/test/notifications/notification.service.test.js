const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const notificationService = require("../../notifications/notification.service");
chai.use(sinonChai);

const MOCK_USERS = [
  {
    id: "1",
    name: "bob",
    phone: "111-222-3333",
    email: "user@email.com"
  },
  {
    id: "2",
    name: "bob2",
    phone: "111-222-3333",
    email: "user@email.com"
  },
  {
    id: "3",
    name: "bob2",
    phone: "111-222-3333",
    email: "user@email.com"
  }
];
const MOCK_TASKS = [
  {
    taskID: "t1",
    task: "Task1",
    contactID: "2",
    type: "both"
  },
  {
    taskID: "t2",
    task: "Task2",
    contactID: "3",
    type: "email"
  },
  {
    taskID: "t3",
    task: "Task3",
    contactID: "1",
    type: "sms"
  }
];
function resolveAccionsGET(a, b) {
  const res = {
    data: {
      tasks: MOCK_TASKS,
      users: MOCK_USERS
    }
  };

  return new Promise(resolve => resolve(res.data.tasks));
}

describe("", () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(axios, "get").callsFake(resolveAccionsGET);
  });

  afterEach(() => {
    axios.get.reset();
    sandbox.restore();
  });

  it('should have a "fetchFromAPI" method', () => {
    expect(notificationService.fetchFromAPI).not.to.be.undefined;
    expect(notificationService.fetchFromAPI).not.to.be.null;
  });

  it('should have a "findByID" method', () => {
    expect(notificationService.findByID).not.to.be.undefined;
    expect(notificationService.findByID).not.to.be.null;
  });

  it('should call "axios" GET method', done => {
    // sandbox.stub(axios, 'get').callsFake(resolveAccionsGET)
    axios.get.reset();

    // sandbox.stub(axios, 'get').callsFake(() => new Promise(resolve =>  {
    //   console.log()
    //   resolve({MOCK_TASKS})
    // }));

    expect(axios.get).not.to.be.called;

    notificationService.fetchFromAPI("api").then((a, b) => {
      done();
    });
    // notificationService.fetchFromAPI('api').then((res) => {
    //   console.log(res, "#############")
    //   expect(axios.get).to.to.be.calledOnce;
    //   done();
    // })
  });

  describe('"findByID method"', () => {
    const found = notificationService.findByID;

    it("should throw if no arguments are passed", () => {
      expect(found()).throw;
    });

    it("should throw if no first argument is not an array", () => {
      expect(found(1, "tasks", "id")).throw;
    });

    it("should throw if no arguments are passed", () => {
      expect(found()).throw;
    });

    it('should returned correct task when idParam = "taskID"', () => {
      expect(found(MOCK_TASKS, "taskID", "t1")).to.equal(MOCK_TASKS[0]);
    });

    it('should returned correct task when idParam = "id"', () => {
      expect(found(MOCK_USERS, "id", "3")).to.equal(MOCK_USERS[2]);
    });
  });
});
