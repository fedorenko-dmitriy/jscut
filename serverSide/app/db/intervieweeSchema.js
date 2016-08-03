"use strict";

var mongoose = require("../libs/mongoose");
var AutoIncrement = require('mongoose-sequence');

var Schema = new mongoose.Schema({
  nickName: String,
  level: Number,
  skillType: Number,
  testSuites: Array
});
Schema.plugin(AutoIncrement, {inc_field: 'interviewee_id'});

module.exports = mongoose.model("interviewee", Schema);
