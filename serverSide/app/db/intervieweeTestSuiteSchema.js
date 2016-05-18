"use strict";
var mongoose = require("../libs/mongoose");

var Schema = new mongoose.Schema({
  id: {type:Number, unique: true},
  interviewee_id: Number,
  testSuite_id: Number,
  state: Object,
  interviewee_solutions: Array,
  score: Number
});


module.exports = mongoose.model("intervieweeTestSuite", Schema);


