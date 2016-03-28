"use strict";
let $ = require('jquery-untouched');
let Backbone = require('backbone');
Backbone.$ = $;

let template = require("../templates/taskView/taskViewTpl.hbs");

export let TaskView = Backbone.View.extend({
  initialize: function(options) {
    options = options||{};
    this.model = options.model || new Backbone.Model();
    this._initEvents();
  },

  events:{
    "click button": "_clickBtnHandler"
  },

  _initEvents: function(){
    this.listenTo(this.model, "change", this._modelChanged)
  },

  _modelChanged: function(){
    this.prepareData();
    this.render();
  },

  _clickBtnHandler: function(){
    this.trigger("checkSolution", this.model.toJSON());
  },

  prepareData: function(){
    this.taskData = this.model.toJSON();
    return this;
  },

  render: function() {
    this.$el.html(template(this.taskData));
    return this;
  }

});

