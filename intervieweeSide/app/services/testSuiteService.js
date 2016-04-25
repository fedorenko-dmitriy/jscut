"use strict";
let $ = require("jquery-untouched");
let _ = require("underscore");

export let testSuiteService = {
  getTestSuite: function(){
    return $.get("http://127.0.0.1:8080/getTestData");
  },

  checkProblemSolution: function(problem){
    problem = JSON.stringify(problem);

    return $.post("http://127.0.0.1:8080/checkProblemSolution", problem);
  }
};

