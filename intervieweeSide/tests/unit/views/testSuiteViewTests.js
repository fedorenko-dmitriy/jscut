"use strict";
let $ = require("jquery-untouched");
let _ = require("underscore");
let Backbone = require('backbone');
var helpers = require("../../../app/util/hbs-helpers");
var mock = require("../mocks/testSuiteData");

helpers.init();

import { TestSuiteView } from '../../../app/views/TestSuiteView';
import { AppModel } from '../../../app/models/AppModel';
import { timeService } from '../../../app/services/timeService';


describe('TestSuiteView Tests', function () {
  let testSuiteView,
      testModel,
      sandbox;

  function createTestCondition(data){
    data = data ? data : mock.getTestSuiteData();
    testModel = new AppModel();

    let result = JSON.stringify({some:data});
    let testSuiteService = {
      checkProblemSolution : function(){
        return $.Deferred().resolve(result);
      },
      getTestSuite : function(){
        return $.Deferred()
      }
    };

    testSuiteView = new TestSuiteView({
      testSuiteService: testSuiteService,
      timeService: timeService,
      model: testModel
    });

    testSuiteView.setInitData(data);
    return testSuiteView;
  }
  beforeEach(()=>{
    sandbox = sinon.sandbox.create();
  });

  afterEach(()=>{
    testSuiteView.remove();
    sandbox.restore();
  });

  describe("method getTestSuiteData", ()=>{
    beforeEach(()=>{
      sandbox.stub(TestSuiteView.prototype, "setInitData");
      createTestCondition();
    });
    it("should call setInitData if testData received from server when method 'getTestSuiteData' is called", (done)=>{
      let resultDFD = returnGetTestSuiteDataResult(done);

      resultDFD.resolve();

      expect(testSuiteView.setInitData.called).to.equal(true);
    });

    it("should throw exception if testData didn't receive from server when method 'getTestSuiteData' is called", (done)=>{
      let resultDFD = returnGetTestSuiteDataResult(done);

      resultDFD.reject();

      expect(resultDFD.state).to.equal("rejected");
    });

    function returnGetTestSuiteDataResult(done){
      let resultDFD = testSuiteView.getTestSuiteData();

      resultDFD.always(function(){
        done();
      });

      return resultDFD;
    }
  });

  describe("method setInitData", ()=>{
    it("should append sub views into testSuiteView.problemViews when method 'setInitData' is called", ()=>{
      createTestCondition();
      expect(testSuiteView.model.get("problems")).to.have.lengthOf(4);
    });

    it("should call method 'start' in timeService when method 'setInitData' is called", ()=>{
      let stub = sandbox.stub(timeService, "start");
      createTestCondition({problems:[{some:"data"}]});
      expect(stub.called).to.equal(true);
    });

    it("should call method 'setCurrentView' when method 'setInitData' is called", ()=>{
      let stub = sandbox.stub(TestSuiteView.prototype, "setCurrentView");
      createTestCondition({problems:[{some:"data"}]});
      expect(stub.called).to.equal(true);
    });

    it("should set first view in problemView array as currentView when method 'setInitData' is called", ()=>{
      createTestCondition({problems:[{some:"data"}]});
      expect(testSuiteView.currentView).to.equal(testSuiteView.problemViews[0]);
    });

    it("shouldn't call method 'setCurrentView' when length of collection problems <=0'", ()=>{
      let stub = sandbox.stub(TestSuiteView.prototype, "setCurrentView");
      createTestCondition({problems:[]});
      expect(stub.called).to.equal(false);
    });
  });

  describe("method setCurrentView", function(){
    it("should set current view of problem view " +
      "when method setCurrentView called with index position of selected view", ()=>{
      createTestCondition();
      testSuiteView.setCurrentView(1);
      expect(testSuiteView.currentView).to.equal(testSuiteView.problemViews[1]);
    });

    it("should throw exception " +
      "when method setCurrentView called with wrong index position of selected view", ()=>{
      let spy = sandbox.spy(TestSuiteView.prototype, "setCurrentView");
      spy.args[0]=5;
      createTestCondition();

      expect(spy).to.throw();
    });

    it("should throw exception " +
      "when method setCurrentView called without index position of selected view", ()=>{
      let spy = sandbox.spy(TestSuiteView.prototype, "setCurrentView");

      createTestCondition({problems:[{problem:1}, {problem:1}]});

      expect(spy).to.throw();
    });

    it("should throw exception " +
      "when method setCurrentView called with argument which is not number", ()=>{
      let spy = sandbox.spy(TestSuiteView.prototype, "setCurrentView");
      spy.args[0]="five";

      createTestCondition({problems:[{problem:1}, {problem:1}]});
      expect(spy).to.throw();
    });
  });

  describe("Application Event 'method::_checkSolutionHandler'", ()=>{
    beforeEach(()=>{
      createTestCondition();
    });

    it("should call method 'update' in timeService, when event 'method::_checkSolutionHandler' is triggered", ()=>{
      let stub = sandbox.stub(timeService, "update");

      testSuiteView.trigger('method::_checkSolutionHandler');

      expect(stub.called).to.equal(true);
    });

    it("should trigger model event 'change' when event 'method::_checkSolutionHandler' is triggered", ()=>{
      let stub = sandbox.stub(testSuiteView.model, "trigger");

      testSuiteView.trigger('method::_checkSolutionHandler');

      expect(stub.calledWith("change")).to.equal(true);
    });
  });

  describe("Application Event 'method::_problemNavHandler'", ()=>{
    beforeEach(()=>{
      createTestCondition();
    });

    it("should change current view to next view in problemView array " +
      "when event 'method::_checkSolutionHandler' is triggered with argument 'direction.first'", ()=>{

      let index = 2;
      testSuiteView.currentView = testSuiteView.problemViews[index];

      testSuiteView.trigger("method::_problemNavHandler", {
        direction: {first:true}
      });

      expect(testSuiteView.currentView).to.equals(testSuiteView.problemViews[0]);
    });

    it("should change current view to next view in problemView array " +
      "when event 'method::_checkSolutionHandler' is triggered with argument 'direction.next'", ()=>{

      let index = 0;
      testSuiteView.currentView = testSuiteView.problemViews[index];

      testSuiteView.trigger("method::_problemNavHandler", {
        index: index,
        direction: {next:true}
      });

      expect(testSuiteView.currentView).to.equals(testSuiteView.problemViews[index+1]);
    });

    it("shouldn't change current view to next view if it last view in problemView array " +
      "when event 'method::_checkSolutionHandler' is triggered with argument 'direction.next'", ()=>{

      let index = testSuiteView.problemViews.length-1;
      testSuiteView.currentView = testSuiteView.problemViews[index];

      testSuiteView.trigger("method::_problemNavHandler", {
        index: index,
        direction: {next:true}
      });

      expect(testSuiteView.currentView).to.equals(testSuiteView.problemViews[index]);
    });

    it("should change current view to previous view in problemView array " +
      "when event 'method::_checkSolutionHandler' is triggered with argument 'direction.prev'", ()=>{

      let index = testSuiteView.problemViews.length-1;
      testSuiteView.currentView = testSuiteView.problemViews[index];

      testSuiteView.trigger("method::_problemNavHandler", {
        index: index,
        direction: {prev:true}
      });

      expect(testSuiteView.currentView).to.equals(testSuiteView.problemViews[index-1]);
    });

    it("shouldn't change current view to previous if it first view in problemView array " +
      "when event 'method::_checkSolutionHandler' is triggered with argument 'direction.prev'", ()=>{

      let index = 0;
      testSuiteView.currentView = testSuiteView.problemViews[index];

      testSuiteView.trigger("method::_problemNavHandler", {
        index: index,
        direction: {prev:true}
      });

      expect(testSuiteView.currentView).to.equals(testSuiteView.problemViews[index]);
    });

    it("shouldn't change current view to last view in problemView array " +
      "when event 'method::_checkSolutionHandler' is triggered with argument 'direction.last'", ()=>{

      let index = testSuiteView.problemViews.length-1;
      testSuiteView.currentView = testSuiteView.problemViews[index];

      testSuiteView.trigger("method::_problemNavHandler", {
        direction: {last:true}
      });

      expect(testSuiteView.currentView).to.equals(testSuiteView.problemViews[index]);
    });
  });

  describe("Application Event 'method::_showResultsHandler'", ()=>{
    it("should trigger event 'showResultsPage'  when event 'method::_showResultsHandler' is triggered", ()=>{
      createTestCondition();
      let spy = sandbox.spy(testSuiteView, "trigger");
      testSuiteView.trigger('method::_showResultsHandler');

      expect(spy.secondCall.calledWith("showResultsPage")).to.equal(true);
    });
  });

  describe("Application Event Listener to 'timerIsStopped'", ()=>{
    it("should trigger event 'showResultsPage'  when event 'timerIsStopped' in timeService is triggered", ()=>{
      let stub = sandbox.stub(TestSuiteView.prototype, "trigger");

      createTestCondition();

      testSuiteView.timeService.trigger('timerIsStopped');

      expect(stub.calledWith("showResultsPage")).to.equal(true);
    });
  });

  describe("Application Event Listener to 'timerIsUpdated'", ()=>{
    it("should trigger call method 'updatePageTimer' when event 'timerIsStopped' in timeService is triggered", ()=>{
      let stub = sandbox.stub(TestSuiteView.prototype, "updatePageTimer");

      createTestCondition();

      testSuiteView.timeService.trigger('timerIsUpdated');

      expect(stub.called).to.equal(true);
    });
  });
});







