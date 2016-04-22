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
  });

  afterEach(()=>{
    sandbox.restore();
  });

  describe("Application Events", ()=>{
    beforeEach(()=>{
      taskModel.set("taskSolution",["value1", "value2"]);
    });

    it("should set simpleType solution to the model" +
      " when method 'method::_setSolutionToTheModel' is called", ()=>{
      let value = "value3";
      taskView.trigger("method::_setSolutionToTheModel", value);
      expect(taskModel.get("taskSolution")).to.eql(["value3"]);
    });

    it("should set value multiType solution to the model" +
      " when value not equal items of 'taskSolution' model attribute", ()=>{
      let value = "value3";
      taskView.trigger("method::_setMultiSolutionToTheModel", value);
      expect(taskModel.get("taskSolution")).to.eql(["value1", "value2", "value3"]);
    });

    it("should remove part of model.Attribute" +
      " when set value has some items of 'taskSolution' model attribute", ()=>{
      let value = "value1";
      taskView.trigger("method::_setMultiSolutionToTheModel", value);
      expect(taskModel.get("taskSolution")).to.eql(["value2"]);
    });
  });


  it("should call method html in view.$el when method 'render' is called", ()=>{
    sandbox.stub(taskView.$el, "html");
    taskView.render();
    expect(taskView.$el.html.called).to.equal(true);
  });

  it("should call method html in view.$el when method 'render' is called", ()=> {
    let result = taskView.render();
    expect(result).to.equal(taskView);
  });
});
