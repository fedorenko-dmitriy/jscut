"use strict";
let Backbone = require('backbone');
var helpers = require("../../../app/util/hbs-helpers");

helpers.init();

import { ProblemView } from "../../../app/views/ProblemView";

describe('Problem View Tests', function () {

  let problemView,
      problemModel,
      problemData,
      sandbox;

  beforeEach(()=>{
    problemModel = new Backbone.Model(problemData);
    problemData = {"some": "data"};
    problemView = new ProblemView({model:problemModel});
    sandbox = sinon.sandbox.create();
  });

  afterEach(()=>{
    sandbox.restore();
  });

  describe("Application Events", ()=>{
    beforeEach(()=>{
      problemModel.set("userSolution",["value1", "value2"]);
    });

    it("should set simpleType solution to the model" +
      " when method 'method::_setSolutionToTheModel' is called", ()=>{
      let value = "value3";
      problemView.trigger("method::_setSolutionToTheModel", value);
      expect(problemModel.get("userSolution")).to.eql(["value3"]);
    });

    it("should set value multiType solution to the model" +
      " when value not equal items of 'userSolution' model attribute", ()=>{
      let value = "value3";
      problemView.trigger("method::_setMultiSolutionToTheModel", value);
      expect(problemModel.get("userSolution")).to.eql(["value1", "value2", "value3"]);
    });

    it("should remove part of model.Attribute" +
      " when set value has some items of 'userSolution' model attribute", ()=>{
      let value = "value1";
      problemView.trigger("method::_setMultiSolutionToTheModel", value);
      expect(problemModel.get("userSolution")).to.eql(["value2"]);
    });
  });


  it("should call method html in view.$el when method 'render' is called", ()=>{
    sandbox.stub(problemView.$el, "html");
    problemView.render();
    expect(problemView.$el.html.called).to.equal(true);
  });

  it("should call method html in view.$el when method 'render' is called", ()=> {
    let result = problemView.render();
    expect(result).to.equal(problemView);
  });
});
