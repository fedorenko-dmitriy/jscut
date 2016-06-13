"use strict";
var _ = require("underscore");
var timeController = require("../models/timeModel");

module.exports = {
  startTimer: function(req, res){
    timeController.set();
    res.end(JSON.stringify(timeController.start()))
  },

  getTime: function(req, res){
    res.end(JSON.stringify(timeController.get()));
  },

  stopTimer: function(req, res){
    var result = timeController.stop()
    console.log(result)
    res.end(JSON.stringify(result));
  }
};
