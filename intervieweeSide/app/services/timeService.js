"use strict";

let _ = require('underscore');
let Backbone = require('backbone');

//let timer = {};
let setTimer;
let absoluteTime = 0;
let remainingTime = 100;

export let timeService = _.extend({
  timer : {},
  init: function(options){
    options = options || {};
    remainingTime = options.duration || 100;
    return this;
  },
  startTimer: function(){
    console.log("start");
    timerHandler.apply(this);
  },

  timeIsUpdated: function(){
    this.trigger("timerIsUpdated", this.timer);
  },

  updateTimer: function(key, value){
    this.timer[key] = value;
  }

}, Backbone.Events);

let stopTimer = function(){
  clearInterval(setTimer);
  console.log("stop");
};

let checkTime = function(){
  if(absoluteTime < remainingTime){
    return absoluteTime;
  } else{
    return false;
  }
};

let timerHandler = function(){
  var self = this;
  setTimer = setInterval(function(){
    let time = checkTime.apply(self);
    if(time === 0){
      absoluteTime = 1;
      setPassedTime.apply(self);
      setRemainingTime.apply(self);
    }
    else if(time ){
      absoluteTime +=1;
      setPassedTime.apply(self);
      setRemainingTime.apply(self);
    } else{
      stopTimer();

      self.updateTimer("testEnded", true);
    }
    timeService.timeIsUpdated();
  },1000);
};


let setPassedTime = function(){
  let time = absoluteTime;
  var minutes = time/60;
  let seconds = 0;
  if(parseInt(minutes) === minutes){
    seconds = 0;
  } else if(parseInt(minutes) === 0){
    seconds = time
  }
  else{
    seconds = time - parseInt(minutes)*60;
  }

  //timer.passedMinutes = appendZero(parseInt(minutes));
  //timer.passedSeconds = appendZero(seconds);

  this.updateTimer("passedMinutes", appendZero(parseInt(minutes)));
  this.updateTimer("passedSeconds", appendZero(seconds));
};

let setRemainingTime = function(){
  let time = remainingTime - absoluteTime;
  var minutes = time/60;
  let seconds = 0;
  if(parseInt(minutes) === minutes){
    seconds = 0;
  }
  else if(parseInt(minutes) === 0){
    seconds = time
  }
  else{
    seconds = time - parseInt(minutes)*60;
  }

  //timer.remainingMinutes = appendZero(parseInt(minutes));
  //timer.remainingSeconds = appendZero(seconds);

  this.updateTimer("remainingMinutes", appendZero(parseInt(minutes)));
  this.updateTimer("remainingSeconds", appendZero(seconds));
};

let appendZero = function(time){
  if(time<10){
    time = "0"+time;
  }
  return time;
};



