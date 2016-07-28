//"use strict";
//
//let _ = require("underscore");
//let Backbone = require("backbone");
//
//export let BaseViewModel = Backbone.Model.extend({
//
//  setDataToServer(dataToUpdate){
//    var self = this;
//    if(checkArgument(dataToUpdate)){
//      this.service.updateById(dataToUpdate.id, dataToUpdate).then(function(data){
//        self.set(data[0]);
//      });
//    }
//  },
//
//  getDataFromServer(query){
//    var self = this;
//    checkArgument(query);
//    if (query.id) {
//      this.service.readById(query.id).then(function(data) {
//        self.set(data);
//      });
//    }
//  },
//
//  removeDataFromServer(query){
//    var self = this;
//    if(checkArgument(query)){
//      this.service.deleteById(query.id).then(function(data){
//        if(data.ok === 1){
//          self.trigger("removed", self);
//        }
//      });
//    }
//  }
//});
//
//function checkArgument(query){
//    if(_.isUndefined(query) || !_.isObject(query) && !_.isFunction(query) && !_.isArray(query)) {
//      throw "passed argument should be an Object";
//    }
//    else if(!_.isUndefined(query) && !_.isUndefined(query.id) && !_.isString(query.id) && !_.isNumber(query.id)) {
//      throw "query id should be string or number";
//    } else {
//    return true;
//  }
//}
