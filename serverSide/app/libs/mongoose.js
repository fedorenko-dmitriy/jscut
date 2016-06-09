"use strict";
var mongoose = require('mongoose');
var config = require("../config");

  mongoose.connect(config.get("mongoose:uri"), config.get("mongoose:options"));

  mongoose.connection.on('error', function (err) {
    console.log('connection error:', err.message);
  });

  mongoose.connection.on('open', function callback () {
    console.log("Connected to DB!");
  });
  mongoose.configurated = true;

  module.exports = mongoose;


