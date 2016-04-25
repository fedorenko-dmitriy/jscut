"use strict";
var _ = require("underscore");
var testSuitesData = require("../db/testSuites");
var problemsData = require("../db/problems");


module.exports = {
  get: function(data){
    return this.set({
      id: data.id,
      problems: [1,3,4]
    });
  },

  set: function(data){
    data = data || {};
    var testSuite = testSuitesData[data.id];
    _.each(problemsData, function(item, key){
      console.log(item.id);
      if(data.problems.indexOf(item.id) !== -1) {
        item = _.omit(item, "rightSolution");
        testSuite.problems.push(item) ;
      }
    });

    return testSuite;
  },

  update: function(){
    //ToDo to implement
  },

  unset: function(){
    //ToDo to implement
  }
};
