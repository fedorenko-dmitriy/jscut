"use strict";

var problemModel = require("../models/problemModel");

module.exports = {
  post: function(){

  },

  get: function(){

  },

  update: function(){

  },

  remove: function(){

  },

  checkUserSolution: function(data){
    console.log(data);

    return problemModel.checkUserSolution(data);
  }
};
