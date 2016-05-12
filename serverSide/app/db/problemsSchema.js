"use strict";

var mongoose = require("../libs/mongoose");

var Schema = mongoose.Schema;
var schema  = new Schema({
  id: {type:Number, unique: true},
  type: String,
  name: String,
  description: String,
  variantsOfSolutions: Array,
  isSolved: Number,
  userSolution: Array, //ToDo  UserSolutionSchema??????
  rightSolution: Array,
  points: Number,
  hint : String
});


module.exports = mongoose.model("problem", schema);
//module.exports.schema = schema;
