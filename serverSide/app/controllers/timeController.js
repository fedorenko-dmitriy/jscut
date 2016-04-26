"use strict";

var timerHandler;

module.exports = {
  set: function(time){
    time = time || {};
    timer.absoluteTime = time.absoluteTime ? time.absoluteTime : 0;
    timer.remainingTime = time.remainingTime ? time.remainingTime : 20;
    return timeStamp();
  },

  get: function(){
    return timeStamp();
  },

  start: function(){
    timerHandler = setInterval(timer, 1000);
    return timeStamp();
  },

  stop: function(){
    clearInterval(timerHandler);
    return timeStamp();
  }
};

function timer(){
  timer.absoluteTime += 1;
  timer.remainingTime -= 1;

  if(!timer.remainingTime){
    timer.testIsEnded = true;
    clearInterval(timerHandler);
  }

  //console.log(timer.absoluteTime)
}

function timeStamp(){
  return {
    testIsEnded: timer.testIsEnded,
    absoluteTime: timer.absoluteTime,
    remainingTime: timer.remainingTime
  }
}


