"use strict";

var _ = require("underscore");
var mongoose = require("../libs/mongoose");
var async = require("async");

function BaseModel(){

}

BaseModel.prototype = {
  mongoose: mongoose,

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
    var self = this;
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
        }
      });

    }, function(err){
      if (err) console.error(err.message);
      controllerCallback(affectedRowsArr);
      self.mongoose.disconnect();
    });
  },

  read: function(controllerCallback, param) {
    var self = this;
    param = param || {};

    var Schema = this.getSchema();
    console.log(Schema);

    this._checkArguments("read", arguments);

    Schema.find(param, function(err, itemData) {
      if (err) console.log(err);

      controllerCallback(itemData);
      self.mongoose.disconnect();
    });
  },

  update: function(controllerCallback, params, options) {
    var self = this;
    options = options || {};

    var Schema = this.getSchema();
    this._checkArguments("update", arguments);

    Schema.findOneAndUpdate({id: params.id}, params, options, function(err, affectedData) { //return
      if(err) console.log(err);

      controllerCallback(affectedData);
      self.mongoose.disconnect();
    });
  },

  remove: function(controllerCallback, param) {
    var self = this;
    var Schema = this.getSchema();
    this._checkArguments("remove", arguments);

    Schema.remove(param, function(err, result) {
      if (err) {
        console.log("item isn't removed");
      } else {
        console.log("item is removed");
        controllerCallback(result);
      }
      self.mongoose.disconnect();
    });
  },

  drop: function(controllerCallback){
    var self = this;
    var Schema = this.getSchema();

    this.mongoose.connection.on("open", function(db){
      Schema.collection.drop(function(err, result) {
        if(err){
          console.log(err);
        }else{
          console.log(result);
          controllerCallback()
        }

        self.mongoose.disconnect();
      });
    });
  },

  _checkArguments: function(methodName, args){
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
