"use strict";

var intervieweeSolutionModel = require("../models/intervieweeSolutionModel");

module.exports = {
  post: function(){

  },

  get: function(){

  },

  update: function(){

  },

  remove: function(){

  },

  checkIntervieweeSolution: function(callback, data){
    //console.log(data);

    return intervieweeSolutionModel.checkIntervieweeSolution(callback, data);
  }
};
