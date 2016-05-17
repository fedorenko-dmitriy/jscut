"use strict";
var _ = require("underscore");
var ProblemSchema = require("../db/problemSchema");

var baseModel = require("./baseModel");

var model = _.extend({}, baseModel);

model.setSchema(ProblemSchema);

module.exports = model;
