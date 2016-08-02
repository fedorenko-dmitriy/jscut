"use strict";

let _ = require("underscore");
let Backbone = require("backbone");
require("backbone.paginator");


let config = require("../config");

import {ProblemModel} from "../models/ProblemModel.js";

export let problemsCollection = new (Backbone.PageableCollection.extend({
  url: config.get("urlConfig", "problems").crud,
  model: ProblemModel,
  mode: "client",

  state: {
    pageSize: 5,
    order: 1
  }

}))();
