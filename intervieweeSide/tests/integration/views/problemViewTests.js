"use strict";

let Backbone = require('backbone');
var helpers = require("../.././hbs-helpers");

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
    document.body.appendChild(problemView.el);
  });

  afterEach(()=>{
    sandbox.restore();
    problemView.$el.remove();
  });

  describe("Dom Events", ()=>{
    beforeEach(()=>{
      sandbox.stub(problemView, "trigger");
    });

    it("should trigger appEvent 'method::_setSolutionToTheModel'" +
      " when user clicked on input with class 'string'",()=>{
      problemView.$el.html("<div class='string'><input value='value1'/><textarea>value2</textarea></div>");
      problemView.$("input").click();

      expect(problemView.trigger.calledWith("method::_setSolutionToTheModel", "value1")).to.equal(true);
    });

    it("should trigger appEvent 'method::_setSolutionToTheModel'" +
      " when user clicked on input with parent class 'evaluate'",()=>{
      problemView.$el.html("<div class='evaluate'><input value='value1'/><textarea>value2</textarea></div>");
      problemView.$("input").click();

      expect(problemView.trigger.calledWith("method::_setSolutionToTheModel", "value1")).to.equal(true);
    });

    it("should trigger appEvent 'method::_setSolutionToTheModel' " +
      "when user clicked on input with parent class 'select'",()=>{
      problemView.$el.html("<div class='select'><input value='value1'/><textarea>value2</textarea></div>");
      problemView.$("input").click();

      expect(problemView.trigger.calledWith("method::_setSolutionToTheModel", "value1")).to.equal(true);
    });

    it("should trigger appEvent 'method::_setMultiSolutionToTheModel' " +
      "when user keyup on input or textarea with parent class 'multiSelect'",()=>{
      problemView.$el.html("<div class='multiSelect'><input value='value1'/><textarea>value2</textarea></div>");
      problemView.$("input").click();

      expect(problemView.trigger.calledWith("method::_setMultiSolutionToTheModel", "value1")).to.equal(true);
    });

    it("should trigger appEvent 'method::_setMultiSolutionToTheModel' " +
      "when user keyup on input or textarea with parent class 'multiSelect'",()=>{
      problemView.$el.html("<div class='multiSelect'><input value='value1'/><textarea>value2</textarea></div>");
      problemView.$("textarea").keyup();

      expect(problemView.trigger.calledWith("method::_setMultiSolutionToTheModel", "value2")).to.equal(true);
    });
  });

  describe("notifications behaviour", ()=>{
    it("should render with hide any notifications", ()=>{
      problemView.render();

      expect(problemView.$(".notification").css("display") == "none").to.equal(false);
      expect(problemView.$(".notification").css("display") == "none").to.equal(false);
    });

    it("should show success notification when model attribute 'isSolved' is changed", ()=>{
      problemView.render();
      let isSolvedAttr = {"isSolved": true};
      problemModel.set(isSolvedAttr, {stop:true});

      expect(problemView.$(".success").attr("display") == "none").to.not.equal(true);
    });

    it("should show error notification when model attribute 'isSolved' is changed", ()=>{
      problemView.render();
      let isSolvedAttr = {"isSolved": false};
      problemModel.set(isSolvedAttr, {stop:true});

      expect(problemView.$(".error").attr("display") == "none").to.not.equal(true);
    });
  });

  describe("check display init initialize", ()=>{
    it("should has method 'isShow'", ()=>{
      expect(problemView.isShow).to.be.an('function');
    });

    it("should has methods 'show'", ()=>{
      expect(problemView.show).to.be.an('function');
    });

    it("should has methods 'hide'", ()=>{
      expect(problemView.hide).to.be.an('function');
    });
  });
});
