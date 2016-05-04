"use strict";

let $ = require("jquery-untouched");
let _ = require("underscore");
let Backbone = require('backbone');

import { timeService } from '../../../app/services/timeService';


describe("TimeService Tests", ()=>{
  let sandbox,
      server;
  beforeEach(()=>{
    sandbox = sinon.sandbox.create();
    server = sinon.fakeServer.create();
  });

  afterEach(()=>{
    sandbox.restore();
    server.restore();
  });

  describe("method get", ()=>{
    it("should get NULL when method 'get' called with wrong key of timeObj in argument", ()=>{
      expect(timeService.get('test')).to.equal(undefined);
    });

    it("should get timer state when method 'get' called with argument 'testIsEnded'", ()=>{
      expect(timeService.get('testIsEnded')).to.equal(false);
    });

    it("should get absoluteTime when method 'get' called with argument 'absoluteTime'", ()=>{
      expect(timeService.get('absoluteTime')).to.equal(null);
    });

    it("should get remainingTime when method 'get' called with argument 'remainingTime'", ()=>{
      expect(timeService.get('remainingTime')).to.equal(null);
    });

    it("should get timerDataObject when method 'get' called withOut argument", ()=>{
      expect(timeService.get()).to.eql({
        testIsEnded : false,
        absoluteTime : null,
        remainingTime : null
      });
    });
  });

  describe("method set", ()=>{
    it("should set data if argument is object when method is called", ()=>{
      timeService.set({testIsEnded: true, absoluteTime:30, remainingTime: 90});

      expect(timeService.get()).to.eql({
        testIsEnded : true,
        absoluteTime : 30,
        remainingTime : 90
      });
    });

    it("should set only 'testIsEnded, absoluteTime, remainingTime' if argument is object when method is called", ()=>{
      timeService.set({
        testIsEnded1: true, absoluteTime1:30, remainingTime1: 90,
        testIsEnded : true, absoluteTime : 30, remainingTime : 90
      });
      expect(timeService.get()).to.eql({
        testIsEnded : true,
        absoluteTime : 30,
        remainingTime : 90
      });
    });

    //ToDo Think about method 'clear' in timer
    //it("should set init attributes when method is called without arguments", ()=>{
    //  timeService.set();
    //  console.log(timeService.get());
    //  expect(timeService.get()).to.eql({
    //    testIsEnded : false,
    //    absoluteTime : null,
    //    remainingTime : 60
    //  });
    //});

    it("should get throw if set 'testIsEnded' as non boolean value when method is called without arguments", ()=>{
      let testThrow = function(){timeService.set("testIsEnded",50);};

      expect(testThrow).to.throw();
    });

    it("should get throw if set 'absoluteTime' as non integer value when method is called without arguments", ()=>{
      let testThrow = function(){timeService.set("absoluteTime", "string");};

      expect(testThrow).to.throw();
    });

    it("should get throw if set 'remainingTime' as non integer value when method is called without arguments", ()=>{
      let testThrow = function(){timeService.set("remainingTime", true);};

      expect(testThrow).to.throw();
    });

    it("should set 'testIsEnded' as boolean value when method is called without arguments", ()=>{
      timeService.set("testIsEnded", true);
      expect(timeService.get("testIsEnded")).to.equal(true);
    });

    it("should set 'absoluteTime' as integer value when method is called without arguments", ()=>{
      timeService.set("absoluteTime", 50);
      expect(timeService.get("absoluteTime")).to.equal(50);
    });

    it("should set 'remainingTime' as integer value when method is called without arguments", ()=>{
      timeService.set("remainingTime", 40);
      expect(timeService.get("remainingTime")).to.equal(40);
    });

  });

  describe("method start", ()=>{
    it("should set data in timer when method is called", ()=>{
      let stub = sandbox.stub(timeService, "set");
      timeService.start();
      server.requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify([{"some": "data"}])
      );

      expect(stub.called).to.equal(true);
    });

    it("should create setInterval handler when method is called", ()=>{
      let stub = sandbox.stub(window, "setInterval");
      timeService.start();
      server.requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify([{"some": "data"}])
      );

      expect(stub.called).to.equal(true);
    });
  });

  describe("method update", ()=>{
    it("should stop timer if response from server empty && timer has data", ()=>{
      let stub1 = sandbox.stub(timeService, "timeIsStopped");
      let stub2 = sandbox.stub(window, "clearInterval");
      timeService.update();
      server.requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify("")
      );

      expect(stub1.called).to.equal(true);
      expect(stub2.called).to.equal(true);
    });

    it("should set data in timer when method is called", ()=>{
      let spy = sandbox.spy(timeService, "set");
      timeService.update();
      server.requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify({
          testIsEnded : undefined,
          absoluteTime : 0,
          remainingTime : 90
        })
      );

      expect(spy.called).to.equal(true);
    });

    it("should call method 'timeIsStopped' when response from server has attribute 'testIsEnded' TRUE ", ()=>{
      let stub1 = sandbox.stub(timeService, "timeIsStopped");
      let stub2 = sandbox.stub(window, "clearInterval");
      timeService.update();
      server.requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify({
          testIsEnded : true,
          absoluteTime : 0,
          remainingTime : 90
        })
      );

      expect(stub1.called).to.equal(true);
      expect(stub2.called).to.equal(true);
    });

    it("should call method 'timeIsUpdated' when method is called", ()=>{
      let stub = sandbox.stub(timeService, "timeIsUpdated");
      timeService.update();
      server.requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify({
          testIsEnded : undefined,
          absoluteTime : 30,
          remainingTime : 90
        })
      );

      expect(stub.called).to.equal(true);
    });
  });

  describe("method stop", ()=>{
    it("should set data in timer when method is called", ()=>{
      let stub = sandbox.stub(timeService, "set");
      timeService.stop();
      server.requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify([{"some": "data"}])
      );

      expect(stub.called).to.equal(true);
    });

    it("should call method 'timeIsStopped' when method is called", ()=>{
      let stub = sandbox.stub(timeService, "timeIsStopped");
      timeService.stop();
      server.requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify([{"some": "data"}])
      );

      expect(stub.called).to.equal(true);
    });

    it("should clearInterval handler, when method is called", ()=>{
      let stub = sandbox.stub(window, "clearInterval");
      timeService.stop();
      expect(stub.called).to.equal(true);
    });
  });

  describe("method timeIsUpdated", ()=>{
    it("should trigger event 'timerIsUpdated' with arguments when method is called", ()=>{
      let stub = sandbox.stub(timeService, "trigger");
      timeService.timeIsUpdated();
      expect(stub.calledWith('timerIsUpdated', {passedMinutes: "00", passedSeconds: "00", remainingMinutes: "01", remainingSeconds: "00"})).to.equal(true);
    });
  });

  describe("method timeIsStopped", ()=>{
    it("should trigger event 'timerIsStopped'  with arguments when method is called", ()=>{
      let stub = sandbox.stub(timeService, "trigger");
      timeService.timeIsStopped();
      expect(stub.calledWith('timerIsStopped', {passedMinutes: "00", passedSeconds: "00", remainingMinutes: "01", remainingSeconds: "00"})).to.equal(true);
    });
  });
});





