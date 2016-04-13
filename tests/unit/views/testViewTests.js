"use strict";
let _ = require("underscore");
let Backbone = require('backbone');
var helpers = require("../../../app/util/hbs-helpers");

helpers.init();

import { TestView } from '../../../app/views/TestView';
import { AppModel } from '../../../app/models/AppModel';
import { timeService } from '../../../app/services/timeService';


describe('Test View Tests', function () {
  let testView,
      testModel,
      sandbox;

  beforeEach(()=>{
    testModel = new AppModel({timeService: timeService});
    testView = new TestView({model: testModel});
    sandbox = sinon.sandbox.create();
  });

  afterEach(()=>{
    delete testView.testService;
    sandbox.restore();
  });

  describe("method getTestData", ()=>{
    it("should call setInitData if testData received from server when method 'getTestData' is called", ()=>{
      sandbox.stub(TestView.prototype, "setInitData");
      let testService = {getTest : function(){return {tasks:[1]};}};
      let testView = new TestView({
        model: testModel,
        testService :testService
      });
      testView.getTestData();

      expect(testView.setInitData.called).to.equal(true);
    });

    it("should throw exception if testData didn't receive from server when method 'getTestData' is called", ()=>{
      sandbox.stub(TestView.prototype, "setInitData");
      let testService = {getTest : function(){return false;}};
      let testView = new TestView({
        model: testModel,
        testService :testService
      });

      expect(testView.getTestData).to.throw();
    });
  });

  describe("method setInitData", ()=>{
    it("should append sub views into testView.taskViews when method 'getTestData' is called", ()=>{
      testView.setInitData({tasks:[{task:1}]});
      expect(testView.model.get("tasks")).to.have.lengthOf(1);
    });

    it("should call method 'setCurrentView' when method 'setInitData' is called", ()=>{
      let stub = sandbox.stub(TestView.prototype, "setCurrentView");
      testView.setInitData({tasks:[{some:"data"}]});
      expect(stub.called).to.equal(true);
    });

    it("should set first view in taskView array as currentView when method 'setInitData' is called", ()=>{
      testView.setInitData({tasks:[{task:1}]});
      expect(testView.currentView).to.equal(testView.taskViews[0]);
    });

    it("shouldn't call method 'setCurrentView' when length of collection tasks <=0'", ()=>{
      let stub = sandbox.stub(TestView.prototype, "setCurrentView");
      testView.setInitData({tasks:[]});
      expect(stub.called).to.equal(false);
    });
  });

  describe("method setCurrentView", function(){
    it("should set current view of task view " +
      "when method setCurrentView called with index position of selected view", ()=>{
      testView.setInitData({tasks:[{task:1}, {task:1}]});
      testView.setCurrentView(1);
      expect(testView.currentView).to.equal(testView.taskViews[1]);
    });

    it("should throw exception " +
      "when method setCurrentView called with wrong index position of selected view", ()=>{
      let spy = sandbox.spy(TestView.prototype, "setCurrentView");
      spy.args[0]=5;
      testView.setInitData({tasks:[{task:1}, {task:1}]});

      expect(spy).to.throw();
    });

    it("should throw exception " +
      "when method setCurrentView called without index position of selected view", ()=>{
      let spy = sandbox.spy(TestView.prototype, "setCurrentView");
      testView.setInitData({tasks:[{task:1}, {task:1}]});

      expect(spy).to.throw();
    });

    it("should throw exception " +
      "when method setCurrentView called with argument which is not number", ()=>{
      let spy = sandbox.spy(TestView.prototype, "setCurrentView");
      spy.args[0]="five";
      testView.setInitData({tasks:[{task:1}, {task:1}]});

      expect(spy).to.throw();
    });
  });

  describe("Application Event 'method::_checkSolutionHandler'", ()=>{
    it("should set solution check result in model of currentView " +
      "when event 'method::_checkSolutionHandler' is triggered", ()=>{
      testView.getTestData();
      let stub = sandbox.stub(testView.currentView.model, "set");
      testView.trigger('method::_checkSolutionHandler');

      expect(stub.called).to.equal(true);
    });

    it("should trigger model event 'change' when event 'method::_checkSolutionHandler' is triggered", ()=>{
      testView.getTestData();
      let stub = sandbox.stub(testView.model, "trigger");
      testView.trigger('method::_checkSolutionHandler');

      expect(stub.calledWith("change")).to.equal(true);
    });
  });

  describe("Application Event 'method::_taskNavHandler'", ()=>{
    it("should change current view to next view in taskView array " +
      "when event 'method::_checkSolutionHandler' is triggered", ()=>{
      testView.getTestData();
      let index = 0;
      testView.currentView = testView.taskViews[index];

      testView.trigger("method::_taskNavHandler", {
        index: index,
        direction: {next:true}
      });

      expect(testView.currentView).to.equals(testView.taskViews[index+1]);
    });

    it("shouldn't change current view to next view if it last view in taskView array " +
      "when event 'method::_checkSolutionHandler' is triggered", ()=>{
      testView.getTestData();

      let index = testView.taskViews.length-1;
      testView.currentView = testView.taskViews[index];

      testView.trigger("method::_taskNavHandler", {
        index: index,
        direction: {next:true}
      });

      expect(testView.currentView).to.equals(testView.taskViews[index]);
    });

    it("should change current view to previous view in taskView array " +
      "when event 'method::_checkSolutionHandler' is triggered", ()=>{
      testView.getTestData();
      let index = testView.taskViews.length-1;
      testView.currentView = testView.taskViews[index];

      testView.trigger("method::_taskNavHandler", {
        index: index,
        direction: {prev:true}
      });

      expect(testView.currentView).to.equals(testView.taskViews[index-1]);
    });

    it("shouldn't change current view to previous if it first view in taskView array " +
      "when event 'method::_checkSolutionHandler' is triggered", ()=>{
      testView.getTestData();
      let index = 0;
      testView.currentView = testView.taskViews[index];

      testView.trigger("method::_taskNavHandler", {
        index: index,
        direction: {prev:true}
      });

      expect(testView.currentView).to.equals(testView.taskViews[index]);
    });
  });

  describe("Application Event 'method::_showResultsHandler'", ()=>{
    it("should trigger event 'showResultsPage'  when event 'method::_showResultsHandler' is triggered", ()=>{
      testView.getTestData();
      let spy = sandbox.spy(testView, "trigger");
      testView.trigger('method::_showResultsHandler');

      expect(spy.secondCall.calledWith("showResultsPage")).to.equal(true);
    });
  });
});

