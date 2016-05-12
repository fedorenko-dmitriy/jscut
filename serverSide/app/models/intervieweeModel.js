"use strict";
var _ = require("underscore");
var IntervieweesModel = require("../db/intervieweesSchema");

var opts = require("optimist").argv;
var fs = require("fs");
var path = require("path");


var model = {
  set: function(intervieweesData) {
    console.log(intervieweesData);
    _.each(intervieweesData, function(intervieweeData) {
      var intervieweeModel = new IntervieweesModel(intervieweeData);
      intervieweeModel.save(function(err) {
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
      IntervieweesModel.find(param, function(err, intervieweeData) {
        if (err) console.log(err);

        controllerCallback([intervieweeData]);
      });
    } else {
      IntervieweesModel.find(function(err, intervieweesData) {
        console.log(intervieweesData)
        if (err) console.log(err);
        console.log(intervieweesData.toString());

        controllerCallback(intervieweesData);
      });
    }
  },

  unset: function() {

  },

  unsetAll: function() {  //ToDo This method is only for development
    this.get(function(intervieweesData) {
      _.each(intervieweesData, function() {
        intervieweesData.remove(function(err) {
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
    model.get(function(intervieweeData){
      console.log(intervieweeData.toString());
    }, {id: opts.id});
  }else{
    model.get(function(intervieweesData){
      console.log(intervieweesData.toString());
    });
  }
}
