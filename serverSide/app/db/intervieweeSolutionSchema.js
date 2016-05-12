"use strict";
var mongoose = require("../libs/mongoose");

var Schema = mongoose.Schema;
var schema  = new Schema({
  interviewee_id : Number,
  problem_id : Number,
  user_solution: Array
});

module.exports = mongoose.model("intervieweeSolution", schema);

