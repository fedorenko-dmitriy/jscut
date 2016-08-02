"use strict";

let _ = require("underscore");
var mongoose = require("../libs/mongoose");
var async = require("async");

function BaseModel(){
  this.schema ={};
}

BaseModel.prototype = {
  mongoose: mongoose,

  setSchema: function(name, schema){
    if(typeof name === "function"){
      this.schema.base = name;
    }else if(_.isString(name) && typeof schema === "function"){
      this.schema[name] = schema;
    }
  },

  getSchema: function(name) {
    if(!name){
      return this.schema.base;
    }
    else if(!name && (!this.schema.base || _.isArray(this.schema.base) || !_.isObject(this.schema.base))) {
      throw "Should define schema as object"
    }
    else{
      if(!this.schema[name] || _.isArray(this.schema[name]) || !_.isObject(this.schema[name])) {
        throw "Should define schema as object"}
      else{
        return this.schema[name];
      }
    }

  },

  create: function(controllerCallback, collectionData) {
    var Schema = this.getSchema();
    this._checkArguments("create", arguments);
    var affectedRowsArr = [];

    async.forEachOf(collectionData, function(itemData, key, callback) {
      var model = new Schema(itemData);
      model.save(function(err, affectedRow) {
        if (err) {
          console.log("item isn't saved");
          throw err;
        } else {
          affectedRowsArr.push(affectedRow);
          console.log("item is saved");
          callback();
        }
      });

    }, function(err){
      if (err) console.error(err.message);
      controllerCallback(affectedRowsArr);
    });
  },

  read: function(controllerCallback, param) {
    param = param || {};

    var Schema = this.getSchema();
    this._checkArguments("read", arguments);

    Schema.find(param, function(err, itemData) {

      console.log(param)
      if (err) console.log(err);

      controllerCallback(itemData);
    });
  },

  update: function(controllerCallback, params, options) {
    options = options || {new:true};

    var Schema = this.getSchema();
    this._checkArguments("update", arguments);

    Schema.findOneAndUpdate({_id: params._id}, params, options, function(err, affectedData) {
      if(err) console.log(err);
      controllerCallback(affectedData);
    });
  },

  remove: function(controllerCallback, param) {
    var Schema = this.getSchema();
    this._checkArguments("remove", arguments);

    Schema.remove(param, function(err, result) {
      if (err) {
        console.log("item isn't removed");
      } else {
        console.log("item is removed");
        controllerCallback(result);
      }
    });
  },

  drop: function(controllerCallback){
    var Schema = this.getSchema();

    this.mongoose.connection.on("open", function(db){
      Schema.collection.drop(function(err, result) {
        if(err){
          console.log(err);
        }else{
          console.log(result);
          controllerCallback()
        }
      });
    });
  },

  _checkArguments: function(methodName, args){console.log(args);
    _.each(args, function(arg){
      if(!args[0] || !_.isFunction(args[0])) throw "Should define first argument as function";

      switch (methodName){
        case "create" : if(!args[1]|| !_.isArray(args[1])){throw "Should define second argument as array";}break;
        case "read" : if(!args[1]|| _.isArray(args[1]) || !_.isObject(args[1])) {throw "Should define second argument as object";} break;
        case "remove" : if(!args[1]|| _.isArray(args[1]) || !_.isObject(args[1])){throw "Should define second argument as object"; } break;
      }
    });
  }
};

module.exports = BaseModel;
