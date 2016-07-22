"use strict";
let $ = require("jquery-untouched");
let _ = require("underscore");

export let baseService = {
  setUrlsConfig: function(urlsConfig){
    if(checkSetUrlsConfigArgument(urlsConfig)){
      this._urls = urlsConfig;
      return true;
    }
  },

  getUrl: function(name){
    if(checkGetUrlArgument.call(this, name)){
      return this._urls[name];
    }
  },

  create: function(data){
    return $.post(this.getUrl("create"), data);
  },

  readByQuery: function(query){
    return $.getJSON(this.getUrl("readByQuery"), query);
  },

  readById: function(id){
    return $.getJSON(this.getUrl("readById")+id);
  },

  updateById: function(id, data){
    return $.ajax({
      method: "PUT",
      url: this.getUrl("updateById") + id,
      data:data
    });
  },

  deleteById: function(id){
    return $.ajax({
      method: "DELETE",
      url: this.getUrl("deleteById") + id
    });
  }
};

function checkSetUrlsConfigArgument(urlsConfig){
  if(_.isUndefined(urlsConfig)) {
    throw "passed config is undefined";
  }
  else if(!_.isObject(urlsConfig) && !_.isFunction(urlsConfig) && !_.isArray(urlsConfig)){
    throw "passed config should be an Object";
  }else{
    return true;
  }
}

function checkGetUrlArgument(name){
  if(_.isUndefined(name)) {
    throw "passed name is undefined";
  }
  else if(!_.isString(name)){
    throw "passed name should be an String";
  }
  else if(_.isUndefined(this._urls[name])){
    throw "requested url not found";
  }
  else{
    return true;
  }
}

