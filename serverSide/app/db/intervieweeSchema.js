"use strict";

var mongoose = require("../libs/mongoose");
var AutoIncrement = require('mongoose-sequence');

var Schema = new mongoose.Schema({
  id: {type:Number, unique: true},
  nickName: {type:String},
  level: Number,
  skillType: Number,
  testSuites: Array
});
Schema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model("interviewee", Schema);
