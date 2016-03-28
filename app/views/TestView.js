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

export let TestView = Backbone.View.extend({
  initialize: function(options) {
    options = options||{};
    this.model = options.model || new Backbone.Model();
    this._initEvents();
    this.taskViews = [];
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
    this.listenTo(taskView,"checkSolution", this._checkSolution);
  },

  _checkSolution: function(model){
    console.log(model);
  },

  render: function() {
    return this;
  }

});

