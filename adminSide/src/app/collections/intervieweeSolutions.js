"use strict";

let _ = require("underscore");
let Backbone = require("backbone");

let config = require("../config");

import {IntervieweeSolutionModel} from "../models/IntervieweeSolutionModel.js";

export let intervieweeSolutionsCollection = new (Backbone.PageableCollection.extend({
  url: config.get("urlConfig", "intervieweeSolutions").crud,
  model: IntervieweeSolutionModel,
  mode: "client",

  state: {
    pageSize: 5,
    order: 1
  }

}))();
