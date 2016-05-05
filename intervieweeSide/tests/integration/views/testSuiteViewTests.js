"use strict";
let _ = require("underscore");
let Backbone = require('backbone');
var helpers = require("../.././hbs-helpers");

var mock = require("../mocks/testSuiteData");

helpers.init();


import { TestSuiteView } from '../../../app/views/TestSuiteView';
import { AppModel } from '../../../app/models/AppModel';
import { timeService } from '../../../app/services/timeService';


describe('TestSuite View Test', function () {
  let testSuiteView,
      sandbox,
      testSuiteModel;

  beforeEach(()=>{
    testSuiteModel = new AppModel({timeService: timeService});
    testSuiteView = new TestSuiteView({model: testSuiteModel});
    sandbox = sinon.sandbox.create();
    document.body.appendChild(testSuiteView.el);
  });

  afterEach(()=>{
    delete testSuiteView.testSuiteService;
    sandbox.restore();
    testSuiteView.$el.remove();
  });

  describe("DOM events", ()=>{
    beforeEach(()=>{
      let data = mock.getTestSuiteData();
      testSuiteView.setInitData(data).render();
    });

    it("should trigger event 'method::_checkSolutionHandler' when button.checkSolution is clicked", ()=>{
      sandbox.spy(testSuiteView,"trigger");

      testSuiteView.$("button.checkSolution").click();

      expect(testSuiteView.trigger.calledWith("method::_checkSolutionHandler")).to.equal(true);
    });

    it("should trigger event 'method::_problemNavHandler' when button.problemNav is clicked", ()=>{
      sandbox.spy(testSuiteView,"trigger");

      testSuiteView.$("button.problemNav").click();

      expect(testSuiteView.trigger.calledWith("method::_problemNavHandler")).to.equal(true);
    });
  });

  describe("method 'updateTimer'", ()=>{
    it("should render time when model is triggered 'time' event", ()=>{
      let stub = sandbox.stub(testSuiteView, "trigger");
      testSuiteView.render();
      testSuiteModel.set("timer", {
        remainingMinutes: "00",
        remainingSeconds: "00"
      });
      testSuiteModel.trigger("time");

      expect(testSuiteView.$(".timer>.time").text()).to.eql("00:00");
      stub.restore();
    });

    it("should trigger event 'showResults' when model attribute timer.testEnded is true", ()=>{
      let stub = sandbox.stub(testSuiteView, "trigger");
      testSuiteModel.set("timer", {testEnded: true});
      testSuiteModel.trigger("time");

      expect(testSuiteView.trigger.calledWith("showResults"));
      stub.restore();
    });
  });

  describe("method setInitData", ()=>{
    it("should set 'currentView' and show 'currentView.el' when method is called with index position", ()=>{
      testSuiteView.setInitData({problems:[{problem:1}, {problem:1}]});
      testSuiteView.setCurrentView(1);

      expect(testSuiteView.currentView).to.equal(testSuiteView.problemViews[1]);
      expect(testSuiteView.currentView.isShow()).to.equal(true);
    });
  });

  describe("navigation behaviour", ()=>{
    beforeEach(()=>{
      let data = mock.getTestSuiteData();
      testSuiteView.setInitData(data).render();
    });
    it("should change view to first when button 'first' is pressed", ()=>{
      testSuiteView.setCurrentView(1);

      testSuiteView.$(".topProblemNav button.first").click();

      let result = _isProblemViewHideExceptPassedView(testSuiteView.problemViews[0]);
      expect(result).to.equal(true);
    });

    it("should change view to previous when button 'prev' is pressed", ()=>{
      testSuiteView.setCurrentView(1);

      testSuiteView.$(".topProblemNav button.prev").click();

      let result = _isProblemViewHideExceptPassedView(testSuiteView.problemViews[0]);
      expect(result).to.equal(true);
    });

    it("should change view to next when button 'next' is pressed", ()=>{
      testSuiteView.setCurrentView(0);

      testSuiteView.$(".topProblemNav button.next").click();

      let result = _isProblemViewHideExceptPassedView(testSuiteView.problemViews[1]);
      expect(result).to.equal(true);
    });

    it("should change view to last when button 'last' is pressed", ()=>{
      testSuiteView.setCurrentView(0);

      testSuiteView.$(".topProblemNav button.last").click();

      let index = testSuiteView.problemViews.length-1;
      let result = _isProblemViewHideExceptPassedView(testSuiteView.problemViews[index]);
      expect(result).to.equal(true);
    });

    function _isProblemViewHideExceptPassedView(view){
      let result = true;
      testSuiteView.problemViews.forEach(function(problemView){
        if(problemView !== view && problemView.isShow()){
          result = false;
        }
      });
      return result
    }
  });

  describe("check display init initialize", ()=>{
    it("should has method 'isShow'", ()=>{
      expect(testSuiteView.isShow).to.be.an('function');
    });

    it("should has methods 'show'", ()=>{
      expect(testSuiteView.show).to.be.an('function');
    });

    it("should has methods 'hide'", ()=>{
      expect(testSuiteView.hide).to.be.an('function');
    });
  });
});

