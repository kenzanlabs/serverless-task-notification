/* istanbul ignore file */
"use strict";

const LambdaTester = require("lambda-tester");
const assert = require("assert");

const getUsers = require("../users/getUsers").get;

require("./populateUsers.js");

describe("Users:", () => {
  describe("getUsers", () => {
    it("should get all users", function() {
      return LambdaTester(getUsers).expectResult(result => {
        let body = JSON.parse(result.body);
        assert.equal(result.statusCode, 200);
        assert.ok(body.length >= 3, "at least the # of users populated");
        assert.ok(body[0].name, "user has a name");
      });
    });

    it("should fail when passed invalid tablename", function() {
      return LambdaTester(getUsers)
        .event({ tablename: "bad" })
        .expectResult(result => {
          assert.equal(result.statusCode, 500);
          assert.equal(result.body, "error getting users");
        });
    });
  });
});
