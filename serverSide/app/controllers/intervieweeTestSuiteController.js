"use strict";
var intervieweeTestSuiteModel = require("../models/intervieweeTestSuiteModel");

module.exports = {
  getTestSuite: function(id){
    return intervieweeTestSuiteModel.get({id:id})
  }
};
