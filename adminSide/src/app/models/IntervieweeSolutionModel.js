"use strict";

let _ = require('underscore');
let Backbone = require('backbone');
let config = require("../config");

export let IntervieweeSolutionModel = Backbone.Model.extend({
  idAttribute: "_id",
  urlRoot: config.get("urlConfig", "intervieweeSolutions").crud,
  defaults: {
    interviewee_id : 0,
    problem_id : 0,
    testSuite_id: 0,
    solution: [],
    isSolved: 0
  }
});
