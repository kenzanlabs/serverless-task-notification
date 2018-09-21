/* istanbul ignore file */
"use strict";

const LambdaTester = require("lambda-tester");
const assert = require("assert");

const createTask = require("../tasks/createTask").create;
const getTasks = require("../tasks/getTasks").get;
const deleteTask = require("../tasks/deleteTask").delete;

var newID;

describe("Tasks:", () => {
  describe("createTask", () => {
    it("should create a new task", () => {
      return LambdaTester(createTask)
        .event({
          body: {
            contactID: "1",
            type: "email",
            body: "test task"
          }
        })
        .expectResult(result => {
          let body = JSON.parse(result.body);
          newID = body.id;
          assert.equal(result.statusCode, 200);
          assert.equal(newID.length, 4);
          assert.equal(body.contactID, "1");
          assert.equal(body.type, "email");
          assert.equal(body.body, "test task");
        });
    });

    it("should fail when passed invalid tablename", () => {
      return LambdaTester(createTask)
        .event({ tablename: "bad" })
        .expectResult(result => {
          assert.equal(result.statusCode, 500);
          assert.equal(result.body, "error creating task");
        });
    });
  });

  describe("getTasks", () => {
    it("should get all tasks", () => {
      return LambdaTester(getTasks).expectResult(result => {
        let body = JSON.parse(result.body);
        assert.equal(result.statusCode, 200);
        assert.ok(body.length >= 1, "at least the task we just created");
        assert.ok(body[0].contactID, "contactID won't be empty");
        assert.ok(body[0].type == "email" || body[0].type == "sms");
      });
    });

    it("should fail when passed invalid tablename", () => {
      return LambdaTester(getTasks)
        .event({ tablename: "bad" })
        .expectResult(result => {
          assert.equal(result.statusCode, 500);
          assert.equal(result.body, "error getting tasks");
        });
    });
  });

  describe("deleteTask", () => {
    it("should delete task", () => {
      return LambdaTester(deleteTask)
        .event({ pathParameters: { id: newID } })
        .expectResult(result => {
          assert.equal(result.statusCode, 200);
          assert.equal(JSON.parse(result.body), newID);
        });
    });

    it("should fail when passed invalid tablename", () => {
      return LambdaTester(deleteTask)
        .event({ tablename: "bad" })
        .expectResult(result => {
          assert.equal(result.statusCode, 500);
          assert.equal(result.body, "error deleting task");
        });
    });
  });
});
