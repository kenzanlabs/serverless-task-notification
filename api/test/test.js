"use strict";

const lTester = require("lambda-tester");
const getUsers = require("../users/getUsers").get;

describe("getUsers", function() {
  it("should get all users", function() {
    return lTester( getUsers )
      .expectResult();
  });
});  
