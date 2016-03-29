"use strict";
//let $ = require('jquery-untouched');
let Backbone = require('backbone');
//Backbone.$ = $;


import {TaskView} from '../../app/views/TaskView.js';

describe('Task View Tests', function () {

  let taskView,
      taskModel,
      taskData;

  beforeEach(()=>{
    taskModel = new Backbone.Model(taskData);
    taskData = {"some": "data"};
    taskView = new TaskView({model:taskModel});
  });

  describe("method prepareData", ()=>{
    it('should convert task data to JSON when method is called', ()=>{
      taskModel = new Backbone.Model(taskData);
      taskView.prepareData();
      expect(taskView.taskData).to.eql(taskData);
    });
  });

  it("should render when model trigger event 'change'", ()=>{
    sinon.spy(taskView,"render");
    taskModel.set(taskData);

    expect(taskView.render.called).to.equal(true);
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

      expect(taskView.$(".notification").width() == 0).to.equal(true);
      expect(taskView.$(".notification").height() == 0).to.equal(true);
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
});
