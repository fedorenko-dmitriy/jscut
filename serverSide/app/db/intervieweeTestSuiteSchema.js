"use strict";
var mongoose = require("../libs/mongoose");

var Schema = new mongoose.Schema({
  "id": Number,
  "interviewee_id": Number,
  "testSuite_id": Number,
  "interviewee_solutions": Array,
  "score": Number
});


module.exports = mongoose.model("intervieweeTestSuite", Schema);


