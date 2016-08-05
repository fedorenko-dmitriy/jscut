"use strict";

let _ = require("underscore");
let Backbone = require("backbone");

let config = require("../config");

import {IntervieweeTestSuiteModel} from "../models/IntervieweeTestSuiteModel.js";

export let intervieweeTestSuitesCollection = new (Backbone.PageableCollection.extend({
  url: config.get("urlConfig", "intervieweeTestSuites").crud,
  model: IntervieweeTestSuiteModel,
  mode: "client",

  state: {
    pageSize: 5,
    order: 1
  }

}))();
