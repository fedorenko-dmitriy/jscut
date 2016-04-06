"use strict";

let $ = require('jquery-untouched');
let Backbone = require('backbone');
Backbone.$ = $;

import { testService } from "../services/testService.js";
import { taskViewFactory } from './taskViewFactory';
//import { TaskModel } from '../models/TaskModel.js';

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
    this.model.set(initTestData, {silent: true});

    this.model.trigger("change:duration"); //ToDo Hack It must resolve and remove

    let tasks = this.model.get("tasks"), length = tasks.length;

    for (let i = 0; i < length; i++) {
      let taskView = taskViewFactory.create(tasks[i]);
      tasks[i] = taskView.model;
      this.appendTaskView(taskView);
    }
    this.currentView = this.taskViews[0];
  },

  appendTaskView: function(taskView){
    this.taskViews.push(taskView);
    this.$el.append(taskView.prepareData().render().$el);
    this._appendEvents(taskView);
  },

  _appendEvents: function(taskView){
    this.listenTo(taskView, "checkSolution", this._checkSolution);
  },

  _checkSolution: function(){
    let model = this.currentView.model;
    console.log(model);
    var result = testService.checkTaskSolution(model.toJSON());
    model.set(result, {stop:true});
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

  isShow: function(){
    if(!this.$el.css("display") && !this.$el.height() && !this.$el.width()){
      return false;
    }else if(this.$el.css("display") && this.$el.css("display") == "none"){
      return false;
    }else if(this.$el.css("display") && this.$el.css("display") !== "none"){
      return true;
    }
  },

  show: function(){
    this.$el.show();
  },

  hide: function(){
    this.$el.hide();
  },

  render: function() {
    this.$el.prepend(template({}));
    return this;
  }
});

