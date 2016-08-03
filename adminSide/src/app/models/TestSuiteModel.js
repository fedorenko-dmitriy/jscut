"use strict";

let _ = require('underscore');
let Backbone = require('backbone');
let config = require("../config");

export let TestSuiteModel = Backbone.Model.extend({
  idAttribute: "_id",
  urlRoot: config.get("urlConfig", "testSuites").crud,
  defaults: {
    name : "",
    problems : [],
    timer: {},
    description : ""
  }
});
