"use strict";
var mongoose = require("../libs/mongoose");

var Schema = mongoose.Schema;
var schema  = new Schema({
  id: {type:Number, unique: true},
  interviewee_id: Number,
  testSuite_id: Number,
  state: Object,
  interviewee_solutions: Array,
  score: Number
});


module.exports = mongoose.model("intervieweeTestSuite", schema);


