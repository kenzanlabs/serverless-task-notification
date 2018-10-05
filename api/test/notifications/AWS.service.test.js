const AWS = require("aws-sdk");
const chai = require('chai');
const expect = chai.expect;
const AWSService = require('../../services/AWS.service');
const sinon = require('sinon');

const STATIC_ASSETS = {
  SES: {
    Source: 'serverlesstasknotification@gmail.com',
    message: {
      Subject: {
        Data: "New MSG from the Serverless-Task-Notication app!"
      }
    }
  }
}

describe('AWSService', () =>{

  describe('emailUser method', () => {
    AWS.config.paramValidation = false;

    let sandbox;

    beforeEach((done) => {
      sandbox = sinon.createSandbox();
      sendEmail = sandbox.spy()

      sandbox.stub(AWS, 'SES').callsFake(() => {
        return {sendEmail}
      })
      done();
    })

    afterEach(() => {
      sandbox.reset();
      sandbox.restore();
    });

    it('should not call aws if no email, or message are passed', () => {
      expect(AWS.SES).not.to.have.been.called;
      expect(sendEmail).not.to.have.been.called;

      AWSService.emailUser();

      expect(AWS.SES).not.to.have.been.called;
      expect(sendEmail).not.to.have.been.called;
    });

    it('emailUser: should call "AWS" with correct params', (done) => {
      expect(AWS.SES).not.to.have.been.called;
      expect(sendEmail).not.to.have.been.called;

      AWSService.emailUser('test@email.com', "Message1");

      expect(AWS.SES).to.have.been.called;
      expect(sendEmail).to.have.been.called;
      expect(sendEmail.calledWithMatch(
        {
          Destination: {ToAddresses: ['test@email.com']},
          Source: "serverlesstasknotification@gmail.com",
          Message: {
            Subject: {Data: "New MSG from the Serverless-Task-Notication app!"},
            Body: {Text: {Data: 'Message1'}}
          }
        }
      )).to.be.true;

      done();
    });
  });

  describe('smsUser method', () => {
    AWS.config.paramValidation = false;

    let sandbox, publish;

    beforeEach((done) => {
      sandbox = sinon.createSandbox();
      publish = sandbox.spy()

      sandbox.stub(AWS, 'SNS').callsFake(() => {
        return {publish}
      })
      done();
    })

    afterEach(() => {
      sandbox.reset();
      sandbox.restore();
    });

    it('should not call aws if no phoneNumber, or message are passed', (done) => {
      expect(AWS.SNS).not.to.have.been.called;
      expect(publish).not.to.have.been.called;

      AWSService.smsUser();

      expect(AWS.SNS).not.to.have.been.called;
      expect(publish).not.to.have.been.called;
      done();
    });

    it('smsUser: should call "AWS" with correct params', (done) => {
      expect(AWS.SNS).not.to.have.been.called;
      expect(publish).not.to.have.been.called;

      AWSService.smsUser('123', 'Message1');

      expect(AWS.SNS).to.have.been.called;
      expect(publish).to.have.been.called;
      expect(publish.calledWithMatch(
        {
          PhoneNumber: '123',
          Message: 'Message1'
        },
      )).to.be.true;

      done();
    });
  });

  describe('postResults method', () => {
    AWS.config.paramValidation = false;

    let sandbox, describeInstances;

    beforeEach((done) => {
      sandbox = sinon.createSandbox();
      describeInstances = sandbox.spy()

      sandbox.stub(AWS, 'EC2').callsFake(() => {
        return {describeInstances}
      })
      done();
    })

    afterEach(() => {
      sandbox.reset();
      sandbox.restore();
    });

    it('should not call aws if no sessionID, or taskID are passed', (done) => {
      expect(AWS.EC2).not.to.have.been.called;
      expect(describeInstances).not.to.have.been.called;

      AWSService.postResults();

      expect(AWS.EC2).not.to.have.been.called;
      expect(describeInstances).not.to.have.been.called;
      done();
    });

    it('smsUser: should call "AWS" with correct params', (done) => {
      expect(AWS.EC2).not.to.have.been.called;
      expect(describeInstances).not.to.have.been.called;

      AWSService.postResults('123', 't2');

      expect(AWS.EC2).to.have.been.called;
      expect(describeInstances).to.have.been.called;
      expect(describeInstances.calledWithMatch(
        { Filters: [{ Name: "tag:Name", Values: ["socketServer"] }] }
      )).to.be.true;
      done();
    });
  });
});