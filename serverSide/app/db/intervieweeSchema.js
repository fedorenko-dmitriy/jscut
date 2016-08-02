"use strict";

var mongoose = require("../libs/mongoose");
var AutoIncrement = require('mongoose-sequence');

var Schema = new mongoose.Schema({
  nickName: {type:String},
  level: Number,
  skillType: Number,
  testSuites: Array
});
Schema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model("interviewee", Schema);
