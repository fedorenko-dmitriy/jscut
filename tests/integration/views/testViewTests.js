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
    testModel;

  beforeEach(()=>{
    testModel = new AppModel({timeService: timeService});
    testView = new TestView({model: testModel});
    document.body.appendChild(testView.el);
  });

  afterEach(()=>{
    delete testView.testService;
    testView.$el.remove();
  });

  describe("DOM events", ()=>{
    it("should trigger event 'method::_checkSolutionHandler' when button.checkSolution is clicked", ()=>{
      testView.getTestData().render();
      sinon.spy(testView,"trigger");

      testView.$("button.checkSolution").click();

      expect(testView.trigger.calledWith("method::_checkSolutionHandler")).to.equal(true);
    });

    it("should trigger event 'method::_taskNavHandler' when button.taskNav is clicked", ()=>{
      testView.getTestData().render();
      sinon.spy(testView,"trigger");

      testView.$("button.taskNav").click();

      expect(testView.trigger.calledWith("method::_taskNavHandler")).to.equal(true);
    });
  });

  describe("method 'updateTimer'", ()=>{
    it("should render time when model is triggered 'time' event", ()=>{
      let stub = sinon.stub(testView, "trigger");
      testView.render();
      testModel.set("timer", {
        remainingMinutes: "00",
        remainingSeconds: "00"
      });
      testModel.trigger("time");

      expect(testView.$(".timer").text()).to.eql("00:00");
      stub.restore();
    });

    it("should trigger event 'showResults' when model attribute timer.testEnded is true", ()=>{
      let stub = sinon.stub(testView, "trigger");
      testModel.set("timer", {testEnded: true});
      testModel.trigger("time");

      expect(testView.trigger.calledWith("showResults"));
      stub.restore();
    });
  });

  describe("method setInitData", ()=>{
    it("should set 'currentView' and show 'currentView.el' when method is called with index position", ()=>{
      testView.setInitData({tasks:[{task:1}, {task:1}]});
      testView.setCurrentView(1);

      expect(testView.currentView).to.equal(testView.taskViews[1]);
      expect(testView.currentView.isShow()).to.equal(true);
    });
  });

  describe("navigation behaviour", ()=>{
    it("should change view to next when button 'prev' is pressed", ()=>{
      testView.getTestData().render();

      testView.setCurrentView(1);

      testView.$(".topTaskNav button.first").click();

      let result = _isTaskViewHideExceptPassedView(testView.taskViews[0]);
      expect(result).to.equal(true);
    });

    it("should change view to next when button 'prev' is pressed", ()=>{
      testView.getTestData().render();

      testView.setCurrentView(1);

      testView.$(".topTaskNav button.prev").click();

      let result = _isTaskViewHideExceptPassedView(testView.taskViews[0]);
      expect(result).to.equal(true);
    });

    it("should change view to next when button 'next' is pressed", ()=>{
      testView.getTestData().render();
      testView.setCurrentView(0);

      testView.$(".topTaskNav button.next").click();

      let result = _isTaskViewHideExceptPassedView(testView.taskViews[1]);
      expect(result).to.equal(true);
    });

    it("should change view to last when button 'last' is pressed", ()=>{
      testView.getTestData().render();
      testView.setCurrentView(0);

      testView.$(".topTaskNav button.last").click();

      let index = testView.taskViews.length-1;
      let result = _isTaskViewHideExceptPassedView(testView.taskViews[index]);
      expect(result).to.equal(true);
    });

    function _isTaskViewHideExceptPassedView(view){
      let result = true;
      testView.taskViews.forEach(function(taskView){
        if(taskView !== view && taskView.isShow()){
          result = false;
        }
      });
      return result
    }
  });

  describe("check display init initialize", ()=>{
    it("should has method 'isShow'", ()=>{
      expect(testView.isShow).to.be.an('function');
    });

    it("should has methods 'show'", ()=>{
      expect(testView.show).to.be.an('function');
    });

    it("should has methods 'hide'", ()=>{
      expect(testView.hide).to.be.an('function');
    });
  });
});

