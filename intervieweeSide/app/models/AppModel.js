"use strict";
let _ = require('underscore');
let Backbone = require('backbone');

export let AppModel = Backbone.Model.extend({
  initialize: function(options){

  },

  set: function(params){
    if(_.isObject(params) && _.isArray(params.problems)){
      params.problems = new Backbone.Collection(params.problems);
    }
    Backbone.Model.prototype.set.apply(this, arguments);
  },

  toJSON: function(){
    let objJSON = Backbone.Model.prototype.toJSON.apply(this);
    objJSON.problems = this.get("problems") ? this.get("problems").toJSON() : [];

    return objJSON;
  }
});



