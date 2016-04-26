"use strict";

let _ = require('underscore');
let $ = require('jquery-untouched');
let Backbone = require('backbone');

let timeToRender = {};

var timerHandler;


export let timeService = _.extend({
  timer : {},

  set: function(time){
    timer.testIsEnded = time.testIsEnded;
    timer.absoluteTime = time.absoluteTime ? time.absoluteTime : 0;
    timer.remainingTime = time.remainingTime ? time.remainingTime : 60;
  },

  get: function(){
    return {
      testIsEnded :timer.testIsEnded,
      absoluteTime : timer.absoluteTime,
      remainingTime : timer.remainingTime
    }
  },

  start: function(){
    let self = this;
    $.getJSON("http://127.0.0.1:8080/startTimer").done(function(time){
      self.set(time);
      timerHandler = setInterval(_.bind(timer, self), 1000);
    });
  },

  update: function(){
    let self = this;
    $.getJSON("http://127.0.0.1:8080/getTime").done(function(time){
      if(!_.isEmpty(self.get()) && _.isEmpty(time)){
        self.timeIsStopped();
        clearInterval(timerHandler);
      }

      self.set(time);
      if(time.testIsEnded || _.isEmpty(time)){
        self.timeIsStopped();
        clearInterval(timerHandler)
      }else{
        self.timeIsUpdated();
      }
    });
  },

  stop: function(){
    let self = this;
    $.getJSON("http://127.0.0.1:8080/stopTimer").done(function(time){
      self.set(time);
      self.timeIsStopped();
    });
    clearInterval(timerHandler);
  },

  timeIsUpdated: function(){
    getPassedTime();
    getRemainingTime();
    this.trigger("timerIsUpdated", timeToRender);
  },

  timeIsStopped: function(){
    getPassedTime();
    getRemainingTime();
    this.trigger("timerIsStopped", timeToRender);
  }

}, Backbone.Events);


function timer(){
  timer.absoluteTime += 1;
  timer.remainingTime -= 1;

  this.timeIsUpdated();

  if(!timer.remainingTime){
    timeService.stop();
  }

  console.log(timer.absoluteTime)
}

function getPassedTime(){
  let time = timeConverter(timer.absoluteTime);

  timeToRender.passedMinutes = time.minutes;
  timeToRender.passedSeconds = time.seconds;
}

function getRemainingTime(){
  let time = timeConverter(timer.remainingTime);

  timeToRender.remainingMinutes = time.minutes;
  timeToRender.remainingSeconds = time.seconds;

  console.log(timeToRender.remainingMinutes);
  console.log(timeToRender.remainingSeconds);
}

let timeConverter = function(time){
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

  return {
    minutes: appendZero(parseInt(minutes)),
    seconds: appendZero(seconds)
  }
};

let appendZero = function(time){
  if(time<10){
    time = "0"+time;
  }
  return time;
};
