"use strict";
let Backbone = require('backbone');

export let AppModel = Backbone.Model.extend({
  initialize: function(){
    startTimer.apply(this);

    this.on("time", this.console)
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



let timer = {};
let setTimer;
let absoluteTime = 0;
let remainingTime = 100;

let startTimer = function(){
  console.log("start");
  timerHandler.apply(this);
};

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

      timer.testEnded = true;
      self.set("timer", timer);
    }
    self.trigger("time");
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

  timer.passedMinutes = appendZero(parseInt(minutes));
  timer.passedSeconds = appendZero(seconds);

  this.set("timer", timer);
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

  timer.remainingMinutes = appendZero(parseInt(minutes));
  timer.remainingSeconds = appendZero(seconds);

  this.set("timer", timer);
};

let appendZero = function(time){
  if(time<10){
    time = "0"+time;
  }
  return time;
}



