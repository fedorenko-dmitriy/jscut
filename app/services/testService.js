"use strict";
let testData = {tasks:[
  {
    number: 1,
    taskName : "Some name#1",
    taskDescription: "Some description",
    taskSolution: "",
    isSolved: 0
  },
  {
    number: 2,
    taskName : "Some name#2",
    taskDescription: "Some description",
    taskSolution: "",
    isSolved: 0
  },
  {
    number: 3,
    taskName : "Some name#3",
    taskDescription: "Some description",
    taskSolution: "",
    isSolved: 0
  }
]};

export let testService = {
  getTest: function(){
    return testData;
  },

  checkTaskSolution: function(task){
    if(task.taskSolution){
      task.isSolved = 1;
    } else {
      task.isSolved = 0;
    }
    return task;
  }
};

