"use strict";
let $ = require('jquery-untouched');
let Backbone = require('backbone');
Backbone.$ = $;

let template = require("../templates/taskView/taskViewTpl.hbs");

export let TaskView = Backbone.View.extend({
  initialize: function(options) {
    this.taskData = options.taskData;
  },

  render: function() {
    this.$el.html(template(this.taskData));
    return this;
  }
});

