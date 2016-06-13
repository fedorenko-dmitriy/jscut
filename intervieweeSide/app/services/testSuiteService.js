"use strict";
let $ = require("jquery-untouched");
let _ = require("underscore");

export let testSuiteService = {
  getTestSuite: function(id){
    id = id || 1;
    return $.getJSON("http://127.0.0.1:8080/test/"+id);
  },

  checkProblemSolution: function(problem){
    console.log(problem)
    //problem = JSON.stringify(problem);

    return $.post("http://127.0.0.1:8080/checkSolution", problem);
  }
};

