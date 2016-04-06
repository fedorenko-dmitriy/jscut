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
    "click button.checkSolution": "_checkSolution",
    "click button.taskNav" :  "_taskNavHandler",
    "click button.showResults" : "_showResults"
  },

  _initEvents: function(){
    this.listenTo(this.model,"time", this._updateTimer);
  },

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

  _checkSolution: function(){
    let model = this.currentView.model;
    console.log(model);
    let result = testService.checkTaskSolution(model.toJSON());
    model.set(result);
    this.model.trigger("change", this.model);
  },

  _showResults: function(){
    this.trigger("showResults");
  },

  _taskNavHandler: function(event){
    var target = $(event.target);
    let index = this.taskViews.indexOf(this.currentView);

    target.hasClass("prev") && this._showPrevTask(index);
    target.hasClass("next") && this._showNextTask(index);
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
  },

  _updateTimer: function(){
    let timer = this.model.get("timer");
    this.$(".timer").html(timer.remainingMinutes + ":" +timer.remainingSeconds);

    if(timer.testEnded){
      this._showResults();
    }
  },

  render: function() {
    var self = this;
    this.$el.html(template({}));
    _.each(this.taskViews, function(taskView){
      self.$(".tasks").append(taskView.prepareData().render().$el);
    });
    return this;
  }
}).extend(displayMixin);

