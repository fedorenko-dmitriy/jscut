"use strict";
let _ = require('underscore');
let Backbone = require('backbone');

export let AppModel = Backbone.Model.extend({
  initialize: function(options){

  },

  set: function(params){
    if(_.isObject(params) && _.isArray(params.problems)){

      let solutions = [];
      if(!params.solutions.length){
        _.each(params.problems, function(problem){
          solutions.push({
            "interviewee_id": params.interviewee.id,
            "testSuite_id": params.testSuite.id,
            "problem_id": problem.id,
            "solution": []
          });
        });
      }else{
        solutions = params.solutions;
      }

      params.problems = new Backbone.Collection(params.problems);
      params.solutions = new Backbone.Collection(solutions);
    }
    Backbone.Model.prototype.set.apply(this, arguments);
  },

  toJSON: function(){
    let objJSON = Backbone.Model.prototype.toJSON.apply(this);
    objJSON.problems = this.get("problems") ? this.get("problems").toJSON() : [];

    return objJSON;
  }
});



