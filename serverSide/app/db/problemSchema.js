"use strict";

var mongoose = require("../libs/mongoose");
var AutoIncrement = require('mongoose-sequence');

var Schema = new mongoose.Schema({
  problem_id: Number,
  type: String,
  name: String,
  description: String,
  variantsOfSolutions: Array,
  rightSolution: Array,
  points: Number,
  hint : String
});

Schema.plugin(AutoIncrement, {inc_field: 'problem_id'});

module.exports = mongoose.model("problem", Schema);

