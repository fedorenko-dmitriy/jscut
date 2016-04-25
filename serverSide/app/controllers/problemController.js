"use strict";

var problemModel = require("../models/problemModel");

module.exports = {
  checkUserSolution: function(data){
    console.log(data);

    return problemModel.checkUserSolution(data);
  }
};

