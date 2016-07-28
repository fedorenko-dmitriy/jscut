"use strict";
let _ = require("underscore");

let configs ={};

import {urlConfig} from "./urlConfig.js";
import {tableConfig} from "./tableConfig.js";

let urlsConfigData = require("./urlsConfigData");
let tablesConfigData = require("./tablesConfigData");

(()=>{

  configs.urlConfig = urlConfig(urlsConfigData);
  configs.tableConfig = tableConfig(tablesConfigData);

})();

module.exports = {
  set: function(nameConfig, object){

    if(checkArgumentName(nameConfig) && checkArgumentObject(object)){
      configs[nameConfig] = object;
      return true;
    }

  },

  get: function(nameConfig, query){
    if(checkArgumentName(nameConfig) && checkArgumentQuery(query)) {
      return configs[nameConfig].get(query);
    }
  }
};

function checkArgumentName(nameConfig){
  if(_.isUndefined(nameConfig)) {
    throw "first arg as 'nameConfig' is undefined";
  }
  else if(!_.isString(nameConfig)){
    throw "first arg as 'nameConfig' should be a String";
  }
  else{
    return true;
  }
}

function checkArgumentQuery(query){
  if(_.isUndefined(query)) {
    throw "second arg as 'query' is undefined";
  }
  else if(!_.isString(query)){
    throw "second arg as 'query' should be a String";
  }
  else{
    return true;
  }
}

function checkArgumentObject(object){
  if(_.isUndefined(object)) {
    throw "second arg as 'object' is undefined";
  }
  else if(!_.isObject(object) && !_.isFunction(object) && !_.isArray(object)){
    throw "second arg as 'object' should be an Object";
  }
  else if(!_.isUndefined(object) && !_.isFunction(object.get)){
    throw "second arg as 'object' should has method 'get'";
  }
  else{
    return true;
  }
}
