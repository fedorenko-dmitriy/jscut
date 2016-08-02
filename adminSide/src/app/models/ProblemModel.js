"use strict";

let _ = require('underscore');
let Backbone = require('backbone');
let config = require("../config");

export let ProblemModel = Backbone.Model.extend({
  idAttribute: "_id",
  urlRoot: config.get("urlConfig", "problems").crud,
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
