"use strict";

let _ = require('underscore');
let $ = require('jquery-untouched');
let Backbone = require('backbone');
Backbone.$ = $;

let displayMixin = require('../mixins/displayMixin');

import { testService } from "../services/testService.js";
import { taskViewFactory } from './taskViewFactory';

let template = require("../templates/testView/testViewTpl.hbs");

export let TestView = Backbone.View.extend({
  className:"test",

  initialize: function(options) {
    options = options||{};
    this.model = options.model;
    this._initEvents();
    this.taskViews = [];
    this.currentView = {};
  },

  events: {
    "click button.checkSolution": "_clickBtnCheckSolution",
    "click button.taskNav" :  "_clickBtnTaskNav",
    "click button.showResults" : "_clickBtnShowResults"
  },

  _initEvents: function(){
    this.listenTo(this.model,"time", this.updateTimer);

    this.on("method::_checkSolutionHandler", this._checkSolutionHandler);
    this.on("method::_showResultsHandler", this._showResultsHandler);
    this.on("method::_taskNavHandler", this._taskNavHandler);
  },

  _clickBtnCheckSolution: function(){
    this.trigger("method::_checkSolutionHandler");
  },

  _clickBtnShowResults: function(){
    this.trigger("method::_showResultsHandler");
  },

  _clickBtnTaskNav: function(event){
    let className;
    let target = $(event.target);
    let index = this.taskViews.indexOf(this.currentView);

    if(!target.hasClass("next") && !target.hasClass("prev")){
      throw "problem with nav class"
    }

    target.hasClass("prev") && (className = {prev: true});
    target.hasClass("next") && (className = {next: true});

    this.trigger("method::_taskNavHandler", {
      index: index,
      className: className
    });
  },

  /*API START*/

  getTestData: function(){
    let initTestData = testService.getTest();
    if(initTestData){
      this.setInitData(initTestData);
    }
  },

  setInitData: function(initTestData){
    var self = this;
    this.model.set(initTestData);

    let tasks = this.model.get("tasks");

    tasks.each(function(model){
      let taskView = taskViewFactory.create(model);
      self.taskViews.push(taskView);
    });

    this.currentView = this.taskViews[0];
  },

  updateTimer: function() {
    let timer = this.model.get("timer");
    this.$(".timer").html(timer.remainingMinutes + ":" + timer.remainingSeconds);

    if (timer.testEnded) {
      this.trigger("showResults");
    }
  },

  render: function() {
    var self = this;
    this.$el.html(template({}));
    _.each(this.taskViews, function(taskView){
      self.$(".tasks").append(taskView.render().$el);
    });
    return this;
  },

  /*Controller*/

  _checkSolutionHandler: function(){
    let model = this.currentView.model;
    console.log(model);
    let result = testService.checkTaskSolution(model.toJSON());
    model.set(result);
    this.model.trigger("change", this.model);
  },

  _showResultsHandler: function(){
    this.trigger("showResultsPage");
  },

  _taskNavHandler: function(data){
    data.className.prev && this._showPrevTask(data.index);
    data.className.next && this._showNextTask(data.index);
  },

  _showPrevTask: function(index){
    if(!this.taskViews[index-1]){ return; }

    this.taskViews[index-1].show();
    this.taskViews[index].hide();
    this.currentView = this.taskViews[index-1];
  },

  _showNextTask: function(index){
    if(!this.taskViews[index+1]){ return; }

    this.taskViews[index+1].show();
    this.taskViews[index].hide();

    this.currentView = this.taskViews[index+1];
  }
}).extend(displayMixin);

