const AWS = require("aws-sdk");
const awsMock = require('aws-sdk-mock');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const AWSService = require('../../services/AWS.service');
chai.use(sinonChai);

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
  let sandbox;
  AWS.config.paramValidation = false;

  it('emailUser: should call "AWS" with correct params', (done) => {
    awsMock.mock('SES', 'sendEmail', (params, callback) => {
      callback(null, params);
    });

    AWSService.emailUser('test@email.com', "Message1", (err, data) => {
      const {Destination, Source, Message} = data;

      expect(Destination.ToAddresses[0]).to.equal('test@email.com');
      expect(Source).to.equal(STATIC_ASSETS.SES.Source);
      expect(Message.Subject.Data).to.equal(STATIC_ASSETS.SES.message.Subject.Data);
      expect(Message.Body.Text.Data).to.equal('Message1');

      done()
    });
  });

  it('smsUser: should call "AWS" with correct params', (done) => {
    awsMock.mock('SNS', 'publish');

    AWSService.smsUser('000-000-0000', "Message1", (err, data) => {
      expect(data.PhoneNumber).to.equal('000-000-0000');
      expect(data.Message).to.equal('Message1');
      done()
    });
  });
});