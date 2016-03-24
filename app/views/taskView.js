"use strict";
let $ = require('jquery-untouched');
let Backbone = require('backbone');
Backbone.$ = $;

let template = require("../templates/taskView/taskViewTpl.hbs");

let TaskView = Backbone.View.extend({
  initialize: function(options) {
    this.taskData = options.taskData;
  },

  render: function() {
    this.$el.html(template(taskData));
    return this;
  }
});

let taskData;
taskData = {
  number: 1,
  taskName : "Some name",
  taskDescription: "Some description",
  taskSolution: ""
};

export let taskView = new TaskView({taskData:taskData});

