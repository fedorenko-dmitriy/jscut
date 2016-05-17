"use strict";
var _ = require("underscore");
var IntervieweeSchema = require("../db/intervieweeSchema");

var baseModel = require("./baseModel");

var model = _.extend({}, baseModel);

model.setSchema(IntervieweeSchema);

module.exports = model;
