"use strict";
var _ = require("underscore");
var IntervieweeSolutionModel = require("../db/intervieweeSolutionSchema");

var opts = require("optimist").argv;
var fs = require("fs");
var path = require("path");


var model = {
  set: function(collectionData) {
    console.log(collectionData);
    _.each(collectionData, function(itemData) {
      var model = new IntervieweeSolutionModel(itemData);
      model.save(function(err) {
        if (err) {
          console.log("problem isn't saved");
          console.log(err);
        } else {
          console.log("problem is saved");

        }
      })
    });
  },

  get: function(controllerCallback, param) {
    if (param) {
      IntervieweeSolutionModel.find(param, function(err, itemData) {
        if (err) console.log(err);

        controllerCallback([itemData]);
      });
    } else {
      IntervieweesModel.find(function(err, collectionData) {
        console.log(collectionData)
        if (err) console.log(err);
        console.log(collectionData.toString());

        controllerCallback(collectionData);
      });
    }
  },

  unset: function() {

  },

  unsetAll: function() {  //ToDo This method is only for development
    this.get(function(collectionData) {
      _.each(collectionData, function(itemData) {
        itemData.remove(function(err) {
          if (err) {
            console.log("problem isn't removed");
          } else {
            console.log("problem is removed");
          }
        })
      });
    });
  }
};

module.exports = model;
// CMD

if(opts.path){
  var filePath = "/media/user/web_drive/PROJECT/JSCUT/serverSide/app/db/"+opts.path;
  fs.readFile(filePath, function(err, content){
    var obj = JSON.parse(content);
    model.set(obj);
  });
}

if(opts.get){
  console.log("get");
  if(_.isNumber(opts.id)){
    model.get(function(itemData){
      console.log(itemData.toString());
    }, {id: opts.id});
  }else{
    model.get(function(collectionData){
      console.log(collectionData.toString());
    });
  }
}

