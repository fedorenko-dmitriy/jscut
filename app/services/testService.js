"use strict";
let testData = [
  {
    number: 1,
    taskName : "Some name#1",
    taskDescription: "Some description",
    taskSolution: ""
  }
  //{
  //  number: 2,
  //  taskName : "Some name#2",
  //  taskDescription: "Some description",
  //  taskSolution: ""
  //},
  //{
  //  number: 3,
  //  taskName : "Some name#3",
  //  taskDescription: "Some description",
  //  taskSolution: ""
  //}

];

export let testService = {
  getTests: function(){
    return testData;

  }
}

