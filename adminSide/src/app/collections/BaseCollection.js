"use strict";

let _ = require("underscore");
let Backbone = require("backbone");

export let BaseCollection = Backbone.Collection.extend({

  getDataFromServer(query){
    var self = this;
    if(checkQueryArgument(query)){
      this.service.readByQuery(query).then(function(data){
        self.set(data)
      });
    }
  },

  removeModelFromCollection(){

  }
});

function checkQueryArgument(query){
  if(!_.isUndefined(query) && !_.isObject(query) && !_.isFunction(query) && !_.isArray(query)) {
    throw "passed query should be an Object";
  }else{
    return true;
  }
}
