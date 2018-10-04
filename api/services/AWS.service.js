const AWS = require("aws-sdk");

const AWS_Service = {
  emailUser: (emailAddress, msg, cb) =>  {
    const sesClient = new AWS.SES();
    
    
    if(!emailAddress && !msn) return;
    sesClient.sendEmail(
      {
        Destination: { ToAddresses: [emailAddress] },
        Source: "serverlesstasknotification@gmail.com",
        Message: {
          Subject: { Data: "New MSG from the Serverless-Task-Notication app!" },
          Body: { Text: { Data: msg } }
        }
      }, cb
    );
  },

  smsUser: (phoneNumber, msg, cb) =>  {
    console.log("in user")

    let snsClient = new AWS.SNS();
    snsClient.publish(
      {
        PhoneNumber: phoneNumber,
        Message: msg
      }, cb
    );
  },

  postResults : (sessionID, taskID)  => {
    const ec2 = new AWS.EC2();

    ec2.describeInstances(
      { Filters: [{ Name: "tag:Name", Values: ["socketServer"] }] },
      (err, result) => {
        if (err) {
          return console.log(err);
        } else {
          let dns = result.Reservations[0].Instances[0].PublicDnsName;
          if (!dns) {
            dns = result.Reservations[1].Instances[0].PublicDnsName;
          }
          const req = http.request({
            hostname: dns,
            port: 9000,
            path: "/notifications",
            method: "POST"
          });
          req.on("error", e => {
            return console.log(e);
          });
          req.write(
            JSON.stringify({
              taskID: taskID
            })
          );
        }
      }
    );
  }
}

module.exports = AWS_Service;