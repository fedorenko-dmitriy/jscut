"use strict";

let _ = require("underscore");
let Backbone = require("backbone");

let config = require("../config");

export let intervieweeTestSuitesCollection = new (Backbone.Collection.extend({
  url: config.get("urlConfig", "intervieweeTestSuites").crud
}))();
