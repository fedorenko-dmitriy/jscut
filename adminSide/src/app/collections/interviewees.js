"use strict";

let _ = require("underscore");
let Backbone = require("backbone");
require("backbone.paginator");


let config = require("../config");

import {IntervieweeModel} from "../models/IntervieweeModel.js";

export let intervieweesCollection = new (Backbone.PageableCollection.extend({
  url: config.get("urlConfig", "interviewees").crud,
  model: IntervieweeModel,
  mode: "client",

  state: {
    pageSize: 5,
    order: 1
  }

}))();
