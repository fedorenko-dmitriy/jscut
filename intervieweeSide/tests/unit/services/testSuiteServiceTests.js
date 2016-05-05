"use strict";
let $ = require("jquery-untouched");
let _ = require("underscore");
let Backbone = require('backbone');

var mock = require("../mocks/testSuiteData");

import { testSuiteService } from '../../../app/services/testSuiteService';

describe("TestSuiteService Tests", ()=>{
  let server;
  beforeEach(()=>{
    server = sinon.fakeServer.create();
  });

  afterEach(()=>{
    server.restore();
  });

  describe("method getTestSuite", ()=>{
    it("should send GET request when method is called", ()=>{
      testSuiteService.getTestSuite();

      expect(server.requests[0].method).to.equals("GET");
    });

    it("should send request to 'http://127.0.0.1:8080/getTestData' when method is called", ()=>{
      testSuiteService.getTestSuite();

      expect(server.requests[0].url).to.equals("http://127.0.0.1:8080/getTestData");
    });

    it("should return deferred object, when method is called", ()=>{
      let result = testSuiteService.getTestSuite();

      expect(typeof result.done).to.equals('function');
      expect(typeof result.error).to.equals('function');
      expect(typeof result.always).to.equals('function');
    });
  });

  describe("method checkProblemSolution", ()=>{
    it("should send POST request when method is called", ()=>{
      testSuiteService.checkProblemSolution();

      expect(server.requests[0].method).to.equals("POST");
    });

    it("should send request to 'http://127.0.0.1:8080/checkProblemSolution' when method is called", ()=>{
      testSuiteService.checkProblemSolution();

      expect(server.requests[0].url).to.equals("http://127.0.0.1:8080/checkProblemSolution");
    });

    it("should send request as JSON string, when method is called", ()=>{
      testSuiteService.checkProblemSolution({});

      expect(typeof server.requests[0].requestBody).to.equals("string");
    });

    it("should return deferred object, when method is called", ()=>{
      let result = testSuiteService.checkProblemSolution();

      expect(typeof result.done).to.equals('function');
      expect(typeof result.error).to.equals('function');
      expect(typeof result.always).to.equals('function');
    });
  });
});
