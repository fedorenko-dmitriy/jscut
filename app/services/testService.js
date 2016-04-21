"use strict";
let $ =require("jquery-untouched");
let _ =require("underscore");

export let testService = {
  getTest: function(){
    let resultDFD = $.Deferred();

    $.get("http://127.0.0.1:8080/getTestData", function(response){
      resultDFD.resolve(JSON.parse(response));
    });

    return resultDFD;
  },

  checkTaskSolution: function(task){
    task = JSON.stringify(task);
    console.log(task);
    let resultDFD = $.Deferred();
    $.post("http://127.0.0.1:8080/checkTaskSolution", task, function(response){
      resultDFD.resolve(JSON.parse(response));
    });
    return resultDFD;
  }
};

