"use strict"
var $ = require('jquery-untouched');
var Backbone = require('backbone');
Backbone.$ = $;

import { TaskView } from './views/taskView';

let taskData = [
  {
    number: 1,
    taskName : "Some name#1",
    taskDescription: "Some description",
    taskSolution: ""
  },
  {
    number: 2,
    taskName : "Some name#2",
    taskDescription: "Some description",
    taskSolution: ""
  },
  {
    number: 3,
    taskName : "Some name#3",
    taskDescription: "Some description",
    taskSolution: ""
  }
];

for(let i = 0; i<taskData.length; i++){
  let taskView = new TaskView({taskData: taskData[i]});
  $('body').append(taskView.render().$el);
}




