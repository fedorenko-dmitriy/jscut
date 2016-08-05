"use strict";

let _ = require('underscore');
let Backbone = require('backbone');
let config = require("../config");

export let IntervieweeTestSuiteModel = Backbone.Model.extend({
  idAttribute: "_id",
  urlRoot: config.get("urlConfig", "intervieweeTestSuites").crud,
  defaults: {
    type: "",
    name: "",
    description: "",
    variantsOfSolutions: [],
    rightSolution: [],
    points: 0,
    hint : ""
  }
});
