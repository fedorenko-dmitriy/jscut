"use strict";
console.log("111111")
var mongoose = require("../libs/mongoose");

var Schema = new mongoose.Schema({
  id: {type:Number, unique: true},
  nickName: String,
  level: Number,
  skillType: Number,
  testSuites: Array
});


module.exports = mongoose.model("interviewee", Schema);
