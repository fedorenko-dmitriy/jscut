"use strict";

var _ = require("underscore");
var mongoose = require("../libs/mongoose");
var async = require("async");

function BaseModel(){

}

BaseModel.prototype = {
  setSchema: function(schema){
    this.schema = schema;
  },

  getSchema: function() {
    if(!this.schema || _.isArray(this.schema) || !_.isObject(this.schema)) {
      throw "Should define schema as object"}
    else{
      return this.schema;
    }

  },

  create: function(controllerCallback, collectionData) {
    var schema = this.getSchema();
    this._checkArguments("create", arguments);
    var affectedRowsArr = [];

    async.forEachOf(collectionData, function(itemData, key, callback) {

      var model = schema(itemData);
      model.save(function(err, affectedRow) {
        if (err) {
          console.log("problem isn't saved");
          throw err;
        } else {
          affectedRowsArr.push(affectedRow);
          console.log("problem is saved");
        }
      });

    }, function(err){
      if (err) console.error(err.message);
      controllerCallback(affectedRowsArr);
      mongoose.disconnect();
    });
  },

  read: function(controllerCallback, param) {
    param = param || {};

    var schema = this.getSchema();
    this._checkArguments("read", arguments);
    schema.find(param, function(err, itemData) {
      if (err) console.log(err);
      console.log("aaaa1111")
      controllerCallback(err, itemData);
      mongoose.disconnect();
    });
  },

  update: function(controllerCallback, params, options) {
    options = options || {};

    var schema = this.getSchema();
    this._checkArguments("update", arguments);

    schema.findOneAndUpdate({id: params.id}, params, options, function(err, affectedData) { //return
      if(err) console.log(err);

      controllerCallback(affectedData);
      mongoose.disconnect();
    });
  },

  remove: function(controllerCallback, param) {
    var schema = this.getSchema();
    this._checkArguments("remove", arguments);

    schema.remove(param, function(err, result) {
      if (err) {
        console.log("item isn't removed");
      } else {
        console.log("item is removed");
        controllerCallback(result);
      }
      mongoose.disconnect();
    });
  },

  drop: function(controllerCallback){
    var schema = this.getSchema();

    mongoose.connection.on("open", function(db){
    schema.collection.drop(function(err, result) {
        if(err){
          console.log(err);
        }else{
          console.log(result);
          controllerCallback()
        }
        mongoose.disconnect();
      });
    });
  },

  _checkArguments: function(methodName, args){
    _.each(args, function(arg){
      if(!args[0] || !_.isFunction(args[0])) throw "Should define first argument as function";
      if(methodName === "create" && (!args[1]|| !_.isArray(args[1]))){throw "Should define second argument as array";}
      if(methodName === "read" && (!args[1]|| _.isArray(args[1]) || !_.isObject(args[1]))){throw "Should define second argument as object";}
      if(methodName === "remove" && (!args[1]|| !_.isArray(args[1]))){throw "Should define second argument as array";}
    });
  }
};

module.exports = BaseModel;
