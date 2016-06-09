"use strict";

var mongoose = require("../libs/mongoose");

var Schema = new mongoose.Schema({
  id: {type:Number, unique: true},
  name : String,
  problems : Array,
  timer: Object,
  description : String
});


module.exports = mongoose.model("testSuite", Schema);
