"use strict";

var _ = require("underscore");
var mongoose = require("../libs/mongoose");

var model = {
  setSchema: function(schema){
    this.schema = schema;
  },

  create: function(controllerCallback, collectionData) {
    var self = this;
    _.each(collectionData, function(itemData) {

      var model = new self.schema(itemData);
      model.save(function(err) {
        console.log("itemData")
        console.log(itemData)
        if (err) {
          console.log("problem isn't saved");
          console.log(err);
        } else {
          console.log("problem is saved");
        }
      }); //ToDo: How to disconnect base???

    });
  },

  read: function(controllerCallback, param) {
    param = param || {};

    this.schema.find(param, function(err, itemData) {
      if (err) console.log(err);

      controllerCallback([itemData]);
      mongoose.disconnect();
    });
  },

  update: function() {
    // ToDo:  this method has to implement
  },

  remove: function(controllerCallback, param) {
    this.schema.find(param, function(err, collectionData) {
      if(err) console.log(err);
      _.each(collectionData, function(itemData) {
        itemData.remove(function(err) {
          if (err) {
            console.log("item isn't removed");
          } else {
            console.log("item is removed");
          }
        })
      });
      mongoose.disconnect();
    });
  },

  drop: function(){
    console.log(this.schema.modelName);
    var self = this;

    mongoose.connection.on("open", function(){
      console.log(mongoose.connection.readyState)

      mongoose.connection.db.dropDatabase(function(err, result) { //ToDo
        console.log("zzzzzz")
        if(err){
          console.log(err);
        }else{
          console.log(result);
        }
        mongoose.disconnect();
      });
    });

  }
};

module.exports = model;

(function(){
  var methodToProxy=["create", "read", "update", "remove"];
  _.each(methodToProxy, function(method){
    var proxied = model[method];
    model[method] = function(controllerCallback){
      if(!model.schema || _.isArray(model.schema) || !_.isObject(model.schema)) throw "Should define schema as object";

      if(!controllerCallback || !_.isFunction(controllerCallback)) throw "Should define first argument as function";

      return proxied.aplly(this, arguments);
    }
  });

})();
