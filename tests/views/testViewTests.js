"use strict";
let Backbone = require('backbone');

import {TestView} from '../../app/views/TestView.js';

describe('Test View Tests', function () {
  let testView,
    testModel;

  beforeEach(()=>{
    testModel = new Backbone.Model();
    testView = new TestView({model: testModel});
    document.body.appendChild(testView.el);
  });

  afterEach(()=>{
    testView.$el.remove();
  });

  it("should get data when method 'getTestData' is called", ()=>{
    sinon.stub(testView, "setInitData");
    testView.getTestData();

    expect(testView.setInitData.called).to.equal(true);
  });

  it("should append sub views into testView.taskViews when method 'getTestData' is called", ()=>{
    testView.getTestData();
    expect(testView.taskViews).to.have.length.above(1);
  });

  it("should append sub views into taskView.$el when method 'getTestData' is called", ()=>{
    testView.getTestData();
    expect(testView.$el.children()).to.have.length.above(1);
  });

  it("should render time when model is triggered 'time' event", ()=>{
    sinon.stub(testView, "trigger");
    testView.render();
    testModel.set("timer", {
      remainingMinutes: "00",
      remainingSeconds: "00"
    });
    testModel.trigger("time");

    expect(testView.$(".timer").text()).to.eql("00:00");
  });

  it("should trigger event 'showResults' when model attribute timer.testEnded is true", ()=>{
    sinon.stub(testView, "trigger");
    testModel.set("timer", {testEnded: true});
    testModel.trigger("time");

    expect(testView.trigger.calledWith("showResults"));
  });

  describe("navigation behaviour", ()=>{
    it("should change view to next when button 'prev' is pressed", ()=>{
      let startView;
      let currentView;
      testView.render();
      testView.getTestData();
      testView.taskViews.forEach(function(elem){
        elem.hide();
      });

      testView.taskViews[1].show();
      testView.$("button.prev").click();
      expect(testView.taskViews[1].isShow()).to.equal(false);
      expect(testView.taskViews[0].isShow()).to.equal(true);

    });

    it("should change view to next when button 'next' is pressed", ()=>{
      let startView;
      let currentView;
      testView.render();
      testView.getTestData();
      testView.taskViews.forEach(function(elem){
        elem.hide();
      });

      testView.taskViews[0].show();
      testView.$("button.next").click();
      expect(testView.taskViews[0].isShow()).to.equal(false);
      expect(testView.taskViews[1].isShow()).to.equal(true);

    });
  });

  describe("visibility", function(){
    it("should return false if 'testView' hide state when method 'isShow' is called", ()=>{
      testView.$el.hide();
      expect(testView.isShow()).to.equal(false);
    });

    it("should return true if 'testView' show state when method 'isShow' is called", ()=>{
      testView.$el.show();
      expect(testView.isShow()).to.equal(true);
    });

    it("should add display attribute as 'block' method 'isShow' is called", ()=>{
      testView.$el.hide();
      testView.show();

      expect(testView.isShow()).to.equal(true);
    });

    it("should remove display attribute as 'block' method 'isShow' is called", ()=>{
      testView.$el.show();
      testView.hide();

      expect(testView.isShow()).to.equal(false);
    });
  });
});

