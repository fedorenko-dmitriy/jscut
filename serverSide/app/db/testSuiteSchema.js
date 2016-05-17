var mongoose = require("../libs/mongoose");

var Schema = mongoose.Schema;
var schema  = new Schema({
  id: {type:Number, unique: true},
  name : String,
  problems : Array,
  timer: Object,
  description : String
});


module.exports = mongoose.model("testSuite", schema);
