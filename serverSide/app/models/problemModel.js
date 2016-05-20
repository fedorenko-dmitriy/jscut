"use strict";
var _ = require("underscore");
var ProblemSchema = require("../db/problemSchema");

var BaseModel = require("./BaseModel");

var model = _.extend({}, new BaseModel());

model.setSchema(ProblemSchema);

module.exports = model;
