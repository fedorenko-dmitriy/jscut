"use strict";
var mongoose = require("../libs/mongoose");
//var testSuites = require("testSuitesSchema"); //ToDo should be imported from testSuitesSchema

var Schema = mongoose.Schema;
var schema  = new Schema({
  id: {type:Number, unique: true},
  nickName: String,
  level: Number,
  skillType: Number,
  testSuites: Array
});


module.exports = mongoose.model("interviewee", schema);
