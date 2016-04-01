"use strict";
let Backbone = require('backbone');

import {TaskView} from '../../app/views/TaskView.js';

describe('Task View Tests', function () {

  let taskView,
      taskModel,
      taskData;

  beforeEach(()=>{
    taskModel = new Backbone.Model(taskData);
    taskData = {"some": "data"};
    taskView = new TaskView({model:taskModel});
    document.body.appendChild(taskView.el);
  });

  afterEach(()=>{
    taskView.$el.remove();
  });

  describe("method prepareData", ()=>{
    it('should convert task data to JSON when method is called', ()=>{
      taskModel = new Backbone.Model(taskData);
      taskView.prepareData();
      expect(taskView.taskData).to.eql(taskData);
    });
  });

  it("should trigger event 'checkSolution' when button clicked", ()=>{
    taskView.prepareData().render();
    sinon.spy(taskView,"trigger");

    taskView.$("button").click();

    expect(taskView.trigger.calledWith("checkSolution")).to.equal(true);
  });

  it("should send model.attributes when event 'checkSolution' triggered", ()=>{
    taskView.prepareData().render();
    sinon.spy(taskView,"trigger");

    taskView.$("button").click();

    expect(taskView.trigger.calledWith("checkSolution", taskModel)).to.equal(true);
  });

  it("should prevent call method 'prepareData' and 'render' when model set call with options = {stop, true}", ()=>{
    taskView.prepareData().render();
    sinon.spy(taskView, "prepareData");
    sinon.spy(taskView, "render");

    taskModel.set("some2", "data2", {stop:true});

    expect(taskView.prepareData.called).to.equal(false);
    expect(taskView.render.called).to.equal(false);
  });

  describe("notifications behaviour", ()=>{
    it("should render with hide any notifications", ()=>{
      taskView.prepareData().render();

      expect(taskView.$(".notification").css("display") == "none").to.equal(false);
      expect(taskView.$(".notification").css("display") == "none").to.equal(false);
    });

    it("should show success notification when model attribute 'isSolved' is changed", ()=>{
      taskView.prepareData().render();
      let isSolvedAttr = {"isSolved": true};
      taskModel.set(isSolvedAttr, {stop:true});

      expect(taskView.$(".success").attr("display") == "none").to.not.equal(true);
    });

    it("should show error notification when model attribute 'isSolved' is changed", ()=>{
      taskView.prepareData().render();
      let isSolvedAttr = {"isSolved": false};
      taskModel.set(isSolvedAttr, {stop:true});

      expect(taskView.$(".error").attr("display") == "none").to.not.equal(true);
    });
  });

  describe("visibility", function(){
    it("should return false if 'taskView' hide state when method 'isShow' is called", ()=>{
      taskView.$el.hide();
      expect(taskView.isShow()).to.equal(false);
    });

    it("should return true if 'taskView' show state when method 'isShow' is called", ()=>{
      taskView.$el.show();
      expect(taskView.isShow()).to.equal(true);
    });

    it("should add display attribute as 'block' method 'isShow' is called", ()=>{
      taskView.$el.hide();
      taskView.show();

      expect(taskView.isShow()).to.equal(true);
    });

    it("should remove display attribute as 'block' method 'isShow' is called", ()=>{
      taskView.$el.show();
      taskView.hide();

      expect(taskView.isShow()).to.equal(false);
    });
  });
});
