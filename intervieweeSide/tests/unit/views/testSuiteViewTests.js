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
  let testView,
      testModel,
      sandbox;

  beforeEach(()=>{
    testModel = new AppModel({timeService: timeService});
    testView = new TestSuiteView({model: testModel});
    sandbox = sinon.sandbox.create();
  });

  afterEach(()=>{
    delete testView.testService;
    sandbox.restore();
  });

  describe("method getTestSuiteData", ()=>{
    let testView;
    beforeEach(()=>{
      sandbox.stub(TestSuiteView.prototype, "setInitData");
      let testService = {getTestSuite : function(){return $.Deferred()}};
      testView = new TestSuiteView({
        model: testModel,
        testService :testService
      });

    });

    it("should call setInitData if testData received from server when method 'getTestSuiteData' is called", (done)=>{
      let resultDFD = returnGetTestSuiteDataResult(done);

      resultDFD.resolve();

      expect(testView.setInitData.called).to.equal(true);
    });

    it("should throw exception if testData didn't receive from server when method 'getTestSuiteData' is called", (done)=>{
      let resultDFD = returnGetTestSuiteDataResult(done);

      resultDFD.reject();

      expect(resultDFD.state).to.equal("rejected");
    });

    function returnGetTestSuiteDataResult(done){
      let resultDFD = testView.getTestSuiteData();

      resultDFD.always(function(){
        done();
      });

      return resultDFD;
    }
  });

  describe("method setInitData", ()=>{
    beforeEach(()=>{
      let data = mock.getTestSuiteData();
      testView.setInitData(data).render();
    });

    it("should append sub views into testView.problemViews when method 'setInitData' is called", ()=>{
      expect(testView.model.get("problems")).to.have.lengthOf(4);
    });

    it("should call method 'setCurrentView' when method 'setInitData' is called", ()=>{
      let stub = sandbox.stub(TestSuiteView.prototype, "setCurrentView");
      testView.setInitData({problems:[{some:"data"}]});
      expect(stub.called).to.equal(true);
    });

    it("should set first view in problemView array as currentView when method 'setInitData' is called", ()=>{
      expect(testView.currentView).to.equal(testView.problemViews[0]);
    });

    it("shouldn't call method 'setCurrentView' when length of collection problems <=0'", ()=>{
      let stub = sandbox.stub(TestSuiteView.prototype, "setCurrentView");
      testView.setInitData({problems:[]});
      expect(stub.called).to.equal(false);
    });
  });

  describe("method setCurrentView", function(){
    beforeEach(()=>{
      let data = mock.getTestSuiteData();
      testView.setInitData(data).render();
    });

    it("should set current view of problem view " +
      "when method setCurrentView called with index position of selected view", ()=>{
      testView.setCurrentView(1);
      expect(testView.currentView).to.equal(testView.problemViews[1]);
    });

    it("should throw exception " +
      "when method setCurrentView called with wrong index position of selected view", ()=>{
      let spy = sandbox.spy(TestSuiteView.prototype, "setCurrentView");
      spy.args[0]=5;

      expect(spy).to.throw();
    });

    it("should throw exception " +
      "when method setCurrentView called without index position of selected view", ()=>{
      let spy = sandbox.spy(TestSuiteView.prototype, "setCurrentView");
      testView.setInitData({problems:[{problem:1}, {problem:1}]});

      expect(spy).to.throw();
    });

    it("should throw exception " +
      "when method setCurrentView called with argument which is not number", ()=>{
      let spy = sandbox.spy(TestSuiteView.prototype, "setCurrentView");
      spy.args[0]="five";
      testView.setInitData({problems:[{problem:1}, {problem:1}]});

      expect(spy).to.throw();
    });
  });

  describe("Application Event 'method::_checkSolutionHandler'", ()=>{
    let testView;
    beforeEach(()=>{
      let data = mock.getTestSuiteData();

      let result = JSON.stringify({some:data});
      let testSuiteService = {
        checkProblemSolution : function(){
          return $.Deferred().resolve(result);
        }
      };
      testView = new TestSuiteView({
        model: testModel,
        testSuiteService :testSuiteService
      });
      testView.setInitData(data).render();
    });

    it("should set solution check result in model of currentView " +
      "when event 'method::_checkSolutionHandler' is triggered", ()=>{

      let stub = sandbox.stub(testView.currentView.model, "set");
      testView.trigger('method::_checkSolutionHandler');

      expect(stub.called).to.equal(true);
    });

    it("should trigger model event 'change' when event 'method::_checkSolutionHandler' is triggered", ()=>{

      let stub = sandbox.stub(testView.model, "trigger");
      testView.trigger('method::_checkSolutionHandler');

      expect(stub.calledWith("change")).to.equal(true);
    });
  });

  describe("Application Event 'method::_problemNavHandler'", ()=>{
    beforeEach(()=>{
      let data = mock.getTestSuiteData();
      testView.setInitData(data).render();
    });

    it("should change current view to next view in problemView array " +
      "when event 'method::_checkSolutionHandler' is triggered with argument 'direction.first'", ()=>{
      let index = 2;
      testView.currentView = testView.problemViews[index];

      testView.trigger("method::_problemNavHandler", {
        direction: {first:true}
      });

      expect(testView.currentView).to.equals(testView.problemViews[0]);
    });

    it("should change current view to next view in problemView array " +
      "when event 'method::_checkSolutionHandler' is triggered with argument 'direction.next'", ()=>{
      let index = 0;
      testView.currentView = testView.problemViews[index];

      testView.trigger("method::_problemNavHandler", {
        index: index,
        direction: {next:true}
      });

      expect(testView.currentView).to.equals(testView.problemViews[index+1]);
    });

    it("shouldn't change current view to next view if it last view in problemView array " +
      "when event 'method::_checkSolutionHandler' is triggered with argument 'direction.next'", ()=>{

      let index = testView.problemViews.length-1;
      testView.currentView = testView.problemViews[index];

      testView.trigger("method::_problemNavHandler", {
        index: index,
        direction: {next:true}
      });

      expect(testView.currentView).to.equals(testView.problemViews[index]);
    });

    it("should change current view to previous view in problemView array " +
      "when event 'method::_checkSolutionHandler' is triggered with argument 'direction.prev'", ()=>{

      let index = testView.problemViews.length-1;
      testView.currentView = testView.problemViews[index];

      testView.trigger("method::_problemNavHandler", {
        index: index,
        direction: {prev:true}
      });

      expect(testView.currentView).to.equals(testView.problemViews[index-1]);
    });

    it("shouldn't change current view to previous if it first view in problemView array " +
      "when event 'method::_checkSolutionHandler' is triggered with argument 'direction.prev'", ()=>{

      let index = 0;
      testView.currentView = testView.problemViews[index];

      testView.trigger("method::_problemNavHandler", {
        index: index,
        direction: {prev:true}
      });

      expect(testView.currentView).to.equals(testView.problemViews[index]);
    });

    it("shouldn't change current view to last view in problemView array " +
      "when event 'method::_checkSolutionHandler' is triggered with argument 'direction.last'", ()=>{

      let index = testView.problemViews.length-1;
      testView.currentView = testView.problemViews[index];

      testView.trigger("method::_problemNavHandler", {
        direction: {last:true}
      });

      expect(testView.currentView).to.equals(testView.problemViews[index]);
    });
  });

  describe("Application Event 'method::_showResultsHandler'", ()=>{
    beforeEach(()=>{
      let data = mock.getTestSuiteData();
      testView.setInitData(data).render();
    });

    it("should trigger event 'showResultsPage'  when event 'method::_showResultsHandler' is triggered", ()=>{

      let spy = sandbox.spy(testView, "trigger");
      testView.trigger('method::_showResultsHandler');

      expect(spy.secondCall.calledWith("showResultsPage")).to.equal(true);
    });
  });
});

