"use strict";
var mongoose = require('mongoose');
var config = require("../config");
mongoose.connect(config.get("mongoose:uri"), config.get("mongoose:options"));

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('connection error:', err.message);
});
db.once('open', function callback () {
  console.log("Connected to DB!");
});

module.exports = mongoose;
