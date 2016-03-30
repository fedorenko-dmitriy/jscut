/**
 * Created by user on 25.03.16.
 */
"use strict";
let $ = require('jquery-untouched');
let Backbone = require('backbone');
Backbone.$ = $;

import {testService} from "../services/testService.js";
import { TaskView } from './TaskView';
import { TaskModel } from '../models/TaskModel.js';

let template = require("../templates/testView/testViewTpl.hbs");

export let TestView = Backbone.View.extend({
  className:"test",

  initialize: function(options) {
    options = options||{};
    this.model = options.model || new Backbone.Model();
    this._initEvents();
    this.taskViews = [];
  },

  events: {
    "click button.taskNav" :  "_taskNavHandler"
  },

  _initEvents: function(){
    this.listenTo(this.model,"change", this._modelChanged);
  },

  getTestData: function(){
    this.model.set(testService.getTest());
  },

  _modelChanged: function(){
    let tasks = this.model.get("tasks"),
        length = tasks.length;

    for(let i= 0; i<length; i++){
      let taskModel = new TaskModel(tasks[i]);
      let taskView = new TaskView({model: taskModel});
      this.appendTaskView(taskView);
    }
  },

  appendTaskView: function(taskView){
    this.taskViews.push(taskView);
    this.$el.append(taskView.prepareData().render().$el);
    this._appendEvents(taskView);
  },

  _appendEvents: function(taskView){
    this.listenTo(taskView, "checkSolution", this._checkSolution);
  },

  _checkSolution: function(model){
    console.log(model);
    var result = testService.checkTaskSolution(model.toJSON());
    model.set(result,{stop:true});
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
        this.taskViews[i-1].show();
        this.taskViews[i].hide();
        break;
      }
    }
  },

  _showNextTask: function(){
    for(let e=0; e<this.taskViews.length; e++) {
      if (this.taskViews[e].isShow() && this.taskViews[e+1]) {
        this.taskViews[e+1].show();
        this.taskViews[e].hide();
        break;
      }
    }
  },


  render: function() {
    this.$el.prepend(template({}));
    return this;
  }
});

