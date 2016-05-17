"use strict";
var mongoose = require("../libs/mongoose");

var Schema = mongoose.Schema;
var schema  = new Schema({
  interviewee_id : Number,
  problem_id : Number,
  solution: Array,
  isSolved: Number
});

module.exports = mongoose.model("intervieweeSolution", schema);

