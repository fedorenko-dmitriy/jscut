"use strict";
let Backbone = require('backbone');

export let AppModel = Backbone.Model.extend({
  initialize: function(options){
    if(options.timeService){
      this.timeService = options.timeService;
    } else {
      throw "Pls init time service un AppModel";
    }

    this._initEvents();
  },

  _initEvents: function(){
    this.on("change:duration", this._initTimer);
    this.listenTo(this.timeService, "timerIsUpdated", this._updateTimer);
  },

  _updateTimer: function(updatedTimer){
    this.set("timer", updatedTimer);
    this.trigger("time");
  },

  _initTimer: function(){
    this.timeService.init({duration: this.get("duration")}).startTimer();
  },

  toJSON: function(){
    let objJSON = Backbone.Model.prototype.toJSON.apply(this);
    objJSON.tasks = [];

    let tasks = this.get("tasks");
    for(let i=0; i<tasks.length; i++){
      objJSON.tasks.push(tasks[i].toJSON());
    }
    return objJSON;
  }
});



