"use strict";
var intervieweeTestSuiteModel = require("../models/intervieweeTestSuiteModel");

module.exports = {
  set: function(obj){

  },

  get: function(callback, id){
    intervieweeTestSuiteModel.get(callback,{id:id});
  },

  unset: function(){

  },

  getTestSuite: function(callback, id){
    this.get(callback, id);
  }
};
