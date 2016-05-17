"use strict";
var intervieweeTestSuiteModel = require("../models/intervieweeTestSuiteModel");

module.exports = {
  set: function(obj){

  },

  get: function(callback, id){
    intervieweeTestSuiteModel.get(callback,{id:id});
  },

  getById: function(callback, id){
    intervieweeTestSuiteModel.getById(callback, id);
  },

  unset: function(){

  },

  getTestSuite: function(callback, id){
    this.getById(callback, id);
  }
};
