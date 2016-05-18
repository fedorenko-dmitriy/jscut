"use strict";

var mongoose = require("../libs/mongoose");

var Schema = new mongoose.Schema({
  id: {type:Number, unique: true},
  type: String,
  name: String,
  description: String,
  variantsOfSolutions: Array,
  rightSolution: Array,
  points: Number,
  hint : String
});


module.exports = mongoose.model("problem", Schema);

