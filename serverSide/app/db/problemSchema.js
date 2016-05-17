"use strict";

var mongoose = require("../libs/mongoose");

var Schema = mongoose.Schema;
var schema  = new Schema({
  id: {type:Number, unique: true},
  type: String,
  name: String,
  description: String,
  variantsOfSolutions: Array,
  rightSolution: Array,
  points: Number,
  hint : String
});


module.exports = mongoose.model("problem", schema);

