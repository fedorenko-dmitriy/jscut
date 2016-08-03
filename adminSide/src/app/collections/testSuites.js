"use strict";

let _ = require("underscore");
let Backbone = require("backbone");
require("backbone.paginator");


let config = require("../config");

import {TestSuiteModel} from "../models/TestSuiteModel.js";

export let testSuitesCollection = new (Backbone.PageableCollection.extend({
  url: config.get("urlConfig", "testSuites").crud,
  model: TestSuiteModel,
  mode: "client",

  state: {
    pageSize: 5,
    order: 1
  }

}))();


