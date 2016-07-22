"use strict";
let _ = require("underscore");

let urlsConfigObj;

export let urlConfig = urlConfigFunction;

function urlConfigFunction (urlsConfigData){
  prepareUrlConfig(urlsConfigData);

   let urlConfigObj = {
    get: function(query){
      if(_.isUndefined(query)) {
        throw "called without name of urls block name";
      }
      else if(!_.isString(query)){
        throw "called with name of urls block name as not string";
      }
      else if(_.isUndefined(urlsConfigObj[query])){
        throw 'you request undefined urls block';
      }
      else{
        return urlsConfigObj[query];
      }
    },
    clear: function(){
      urlConfig = urlConfigFunction;
    }
  };
  return urlConfig = urlConfigObj;
}

function prepareUrlConfig(urlsConfigData){
  urlsConfigData = checkTypeOfArgument(urlsConfigData);

  urlsConfigObj = {};
  _.map(urlsConfigData, function(value, key){

    if(key !== "baseUrl"){
      urlsConfigObj[key] = addBaseUrl(urlsConfigData.baseUrl, value)
    }
  });
}

function addBaseUrl(baseUrl, objectToMap){
  let newObj = {};
  _.each(objectToMap, function(value, key){
    newObj[key] = baseUrl+value;
  });
  return newObj;
}

function checkTypeOfArgument(urlsConfigData){
  if(_.isObject(urlsConfigData) && !_.isFunction(urlsConfigData)&&! _.isArray(urlsConfigData)){
    return urlsConfigData;
  }
  else if(_.isString(urlsConfigData)){
    return modifyDataToObject(urlsConfigData);
  }
  else{
    throw "should initialize with argument as JSON or Object";
  }
}

function modifyDataToObject(urlsConfigData){
  return JSON.parse(urlsConfigData);
}



