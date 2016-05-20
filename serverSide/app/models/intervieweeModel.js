"use strict";
var _ = require("underscore");
var IntervieweeSchema = require("../db/intervieweeSchema");

var BaseModel = require("./BaseModel");

var model = _.extend({}, new BaseModel());

model.setSchema(IntervieweeSchema);

module.exports = model;
