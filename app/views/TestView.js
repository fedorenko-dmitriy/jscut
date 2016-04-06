"use strict";

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
      self.appendTaskView(taskView);
    });

    this.currentView = this.taskViews[0];
  },

  appendTaskView: function(taskView){
    this.taskViews.push(taskView);
    this.$el.append(taskView.prepareData().render().$el);
  },

  _checkSolution: function(){
    let model = this.currentView.model;
    console.log(model);
    var result = testService.checkTaskSolution(model.toJSON());
    model.set(result);
    this.model.trigger("change", this.model);
  },

  _showResults: function(){
    this.trigger("showResults");
  },

  _taskNavHandler: function(event){
    var classNames = $(event.target).attr("class").split(" ");

    for(let i = 0; i<classNames.length; i++){
      if(classNames[i] === "prev"){
        this._showPrevTask();
        break;
      }
      if(classNames[i] === "next"){
        this._showNextTask();
        break;
      }
    }
  },

  _showPrevTask: function(){
    for(let i=0; i<this.taskViews.length; i++) {
      if (this.taskViews[i].isShow() && this.taskViews[i-1]) {
        this.currentView = this.taskViews[i-1];
        this.taskViews[i-1].show();
        this.taskViews[i].hide();
        break;
      }
    }
  },

  _showNextTask: function(){
    for(let e=0; e<this.taskViews.length; e++) {
      if (this.taskViews[e].isShow() && this.taskViews[e+1]) {
        this.currentView = this.taskViews[e+1];
        this.taskViews[e+1].show();
        this.taskViews[e].hide();
        break;
      }
    }
  },

  _updateTimer: function(){
    let timer = this.model.get("timer");
    this.$(".timer").html(timer.remainingMinutes + ":" +timer.remainingSeconds);

    if(timer.testEnded){
      this._showResults();
    }
  },

  render: function() {
    this.$el.prepend(template({}));
    return this;
  }
}).extend(displayMixin);

