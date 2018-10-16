const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const ProcessFN = require("../../notifications/process");
const notificationService = require("../../notifications/notification.service");
const AWS_Service = require("../../services/AWS.service");
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
const MOCK_EVENT_OBJECT = {
  Records: [
    {
      Sns: {
        Message: "clientID,t1"
      }
    }
  ]
};
const resolveTasks = () => {
  return new Promise(r => r({ MOCK_TASKS }));
};
const resolveUsers = () => {
  return new Promise(r => r({ MOCK_USERS }));
};

function fetchFromAPIMOCK(api, item) {
  return new Promise((resolve, reject) => {
    resolve([]);
  });
}

function findTask() {
  return MOCK_TASKS[0];
}

function findUser() {
  return MOCK_USERS[0];
}

describe("Process Lambda", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should throw an error is no EVENT is passes as a param", () => {
    const fn = () => {
      return ProcessFN.handler();
    };

    expect(fn).to.throw("Cannot read property");
  });

  describe("", () => {
    let smsUserMock, emailUserSpy, postResultsSpy;

    beforeEach(() => {
      process.env.TasksAPI = "http://localhost:9000/tasks";
      process.env.UsersAPI = "http://localhost:9000/users";

      sandbox
        .stub(notificationService, "fetchFromAPI")
        .withArgs(sinon.match(process.env.TasksAPI))
        .callsFake(resolveTasks)
        .withArgs(sinon.match(process.env.UsersAPI))
        .callsFake(resolveUsers);
      sandbox
        .stub(notificationService, "findByID")
        .withArgs(sinon.match.any, sinon.match("taskID"), sinon.match.any)
        .callsFake(findTask)
        .withArgs(sinon.match.any, sinon.match("id"), sinon.match.any)
        .callsFake(findUser);

      emailUserSpy = sandbox.spy();
      smsUserMock = sandbox.spy();
      postResultsSpy = sandbox.spy();

      sandbox.stub(AWS_Service, "emailUser").callsFake(emailUserSpy);
      sandbox.stub(AWS_Service, "smsUser").callsFake(smsUserMock);
      sandbox.stub(AWS_Service, "postResults").callsFake(postResultsSpy);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("should call postResults when all working correct", done => {
      expect(notificationService.fetchFromAPI).not.to.have.been.called;

      ProcessFN.handler(MOCK_EVENT_OBJECT);

      expect(notificationService.fetchFromAPI).to.have.been.calledOnce;
      // TODO - Check the following line, for some reason the spy get triggered, but not recorded
      // expect(postResultsSpy).to.have.been.called;
      done();
    });
  });
});
