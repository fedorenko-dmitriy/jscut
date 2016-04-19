"use strict";

let Backbone = require('backbone');
var helpers = require("../../../app/util/hbs-helpers");

helpers.init();

import { TaskView } from "../../../app/views/TaskView";

describe('Task View Tests', function () {

  let taskView,
      taskModel,
      taskData,
      sandbox;

  beforeEach(()=>{
    taskModel = new Backbone.Model(taskData);
    taskData = {"some": "data"};
    taskView = new TaskView({model:taskModel});
    sandbox = sinon.sandbox.create();
    document.body.appendChild(taskView.el);
  });

  afterEach(()=>{
    sandbox.restore();
    taskView.$el.remove();
  });

  describe("Dom Events", ()=>{
    beforeEach(()=>{
      sandbox.stub(taskView, "trigger");
    });

    it("should trigger appEvent 'method::_setSolutionToTheModel'" +
      " when user clicked on input with class 'string'",()=>{
      taskView.$el.html("<div class='string'><input value='value1'/><textarea>value2</textarea></div>");
      taskView.$("input").click();

      expect(taskView.trigger.calledWith("method::_setSolutionToTheModel", "value1")).to.equal(true);
    });

    it("should trigger appEvent 'method::_setSolutionToTheModel'" +
      " when user clicked on input with parent class 'evaluate'",()=>{
      taskView.$el.html("<div class='evaluate'><input value='value1'/><textarea>value2</textarea></div>");
      taskView.$("input").click();

      expect(taskView.trigger.calledWith("method::_setSolutionToTheModel", "value1")).to.equal(true);
    });

    it("should trigger appEvent 'method::_setSolutionToTheModel' " +
      "when user clicked on input with parent class 'select'",()=>{
      taskView.$el.html("<div class='select'><input value='value1'/><textarea>value2</textarea></div>");
      taskView.$("input").click();

      expect(taskView.trigger.calledWith("method::_setSolutionToTheModel", "value1")).to.equal(true);
    });

    it("should trigger appEvent 'method::_setMultiSolutionToTheModel' " +
      "when user keyup on input or textarea with parent class 'multiSelect'",()=>{
      taskView.$el.html("<div class='multiSelect'><input value='value1'/><textarea>value2</textarea></div>");
      taskView.$("input").click();

      expect(taskView.trigger.calledWith("method::_setMultiSolutionToTheModel", "value1")).to.equal(true);
    });

    it("should trigger appEvent 'method::_setMultiSolutionToTheModel' " +
      "when user keyup on input or textarea with parent class 'multiSelect'",()=>{
      taskView.$el.html("<div class='multiSelect'><input value='value1'/><textarea>value2</textarea></div>");
      taskView.$("textarea").keyup();

      expect(taskView.trigger.calledWith("method::_setMultiSolutionToTheModel", "value2")).to.equal(true);
    });
  });

  describe("notifications behaviour", ()=>{
    it("should render with hide any notifications", ()=>{
      taskView.render();

      expect(taskView.$(".notification").css("display") == "none").to.equal(false);
      expect(taskView.$(".notification").css("display") == "none").to.equal(false);
    });

    it("should show success notification when model attribute 'isSolved' is changed", ()=>{
      taskView.render();
      let isSolvedAttr = {"isSolved": true};
      taskModel.set(isSolvedAttr, {stop:true});

      expect(taskView.$(".success").attr("display") == "none").to.not.equal(true);
    });

    it("should show error notification when model attribute 'isSolved' is changed", ()=>{
      taskView.render();
      let isSolvedAttr = {"isSolved": false};
      taskModel.set(isSolvedAttr, {stop:true});

      expect(taskView.$(".error").attr("display") == "none").to.not.equal(true);
    });
  });

  describe("check display init initialize", ()=>{
    it("should has method 'isShow'", ()=>{
      expect(taskView.isShow).to.be.an('function');
    });

    it("should has methods 'show'", ()=>{
      expect(taskView.show).to.be.an('function');
    });

    it("should has methods 'hide'", ()=>{
      expect(taskView.hide).to.be.an('function');
    });
  });
});
