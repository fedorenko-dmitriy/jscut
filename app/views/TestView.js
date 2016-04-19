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
    this.testService = options.testService ? options.testService : testService; // ToDo Hack: this string create only for testing
    this.model = options.model;
    this._initEvents();
    this.taskViews = [];
    this.currentView = {};
  },

  events: {
    "click button.checkSolution": "_clickBtnCheckSolution",
    "click button.taskNav" :  "_clickBtnTaskNav"
  },

  _initEvents: function(){
    this.listenTo(this.model,"time", this.updateTimer);

    this.on("method::_checkSolutionHandler", this._checkSolutionHandler);
    this.on("method::_taskNavHandler", this._taskNavHandler);
    this.on("method::_showResultsHandler", this._showResultsHandler);
  },

  _clickBtnCheckSolution: function(){
    this.trigger("method::_checkSolutionHandler");
  },

  _clickBtnShowResults: function(){
    this.trigger("method::_showResultsHandler");
  },

  _clickBtnTaskNav: function(event){
    let direction;
    let target = $(event.target);

    if(!target.hasClass("first") && !target.hasClass("prev") && !target.hasClass("next") && !target.hasClass("last")){
      throw "problem with nav class"
    }

    target.hasClass("first") && (direction = {first: true});
    target.hasClass("prev") && (direction = {prev: true});
    target.hasClass("next") && (direction = {next: true});
    target.hasClass("last") && (direction = {last: true});

    this.trigger("method::_taskNavHandler", {direction: direction});
  },

  /*API START*/

  getTestData: function(){
    let dfd = $.Deferred();
    let initTestData = this.testService.getTest();
    if(initTestData && initTestData.tasks.length>0){
      this.setInitData(initTestData);
      setTimeout(dfd.resolve, 1000);
    } else{
      dfd.reject();
      throw "App doesn't receive testData";
    }

    return dfd;
  },

  setInitData: function(initTestData){
    var self = this;
    this.model.set(initTestData);

    let tasks = this.model.get("tasks");

    if(tasks.length>0){
      tasks.each(function(model){
        let taskView = taskViewFactory.create(model);
        self.taskViews.push(taskView);
      });

      this.setCurrentView(0);
    }
    return this;
  },

  setCurrentView: function(index){
    if(_.isNumber(index) && this.taskViews[index]) {
      this._hideAllTasks();

      this.currentView = this.taskViews[index];
      this.currentView.show();
    }else{
      throw 'index not specify or view with this index undefined';
    }

    return this;
  },

  updateTimer: function() {
    let timer = this.model.get("timer");
    this.$(".timer>.time").html(timer.remainingMinutes + ":" + timer.remainingSeconds);

    if (timer.testEnded) {
      this.trigger("showResults");
    }

    return this;
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
    let result = this.testService.checkTaskSolution(model.toJSON());
    model.set(result);
    this.model.trigger("change", this.model);
  },

  _showResultsHandler: function(){
    this.trigger("showResultsPage");
  },

  _taskNavHandler: function(data){
    let index = this.taskViews.indexOf(this.currentView);

    data.direction.first && this._showFirstTask();
    data.direction.prev && this._showPrevTask(index);
    data.direction.next && this._showNextTask(index);
    data.direction.last && this._showLastTask();
  },

  _showFirstTask: function(){
    let index = 0;
    this.setCurrentView(index);
  },

  _showPrevTask: function(index){
    if(!this.taskViews[index-1]){ return; }
    this.setCurrentView(index-1);
  },

  _showNextTask: function(index){
    if(!this.taskViews[index+1]){ return; }

    this.setCurrentView(index+1);
  },

  _showLastTask: function(){
    let index = this.taskViews.length-1;
    this.setCurrentView(index);
  },

  _hideAllTasks: function(){
    this.taskViews.forEach(function(taskView){
      taskView.hide();
    });
  }
}).extend(displayMixin);

