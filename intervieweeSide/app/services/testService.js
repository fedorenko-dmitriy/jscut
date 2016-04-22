"use strict";
let $ = require("jquery-untouched");
let _ = require("underscore");

export let testService = {
  getTest: function(){
    let resultDFD = $.Deferred();

    return $.get("http://127.0.0.1:8080/getTestData");
  },

  checkTaskSolution: function(task){
    task = JSON.stringify(task);

    return $.post("http://127.0.0.1:8080/checkTaskSolution", task);
  }
};

