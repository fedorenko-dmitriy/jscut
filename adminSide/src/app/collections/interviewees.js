"use strict";

let _ = require("underscore");
let Backbone = require("backbone");

let config = require("../config");

import {IntervieweeModel} from "../models/IntervieweeModel.js";

export let intervieweesCollection = new (Backbone.Collection.extend({
  url: config.get("urlConfig", "interviewees").crud,
  model: IntervieweeModel
}))();
