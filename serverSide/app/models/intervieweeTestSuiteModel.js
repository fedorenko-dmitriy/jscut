"use strict";
var _ = require("underscore");

var IntervieweeTestSuiteModel = require("../db/intervieweeTestSuiteSchema");
var TestSuiteModel = require("../db/testSuiteSchema");
var IntervieweeModel = require("../db/intervieweeSchema");

var opts = require("optimist").argv;
var fs = require("fs");
var path = require("path");


var model = {
  set: function(collectionData) {
    console.log(collectionData);
    _.each(collectionData, function(itemData) {
      var model = new IntervieweeTestSuiteModel(itemData);
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
    console.log(param)
    if (param) {
      IntervieweeTestSuiteModel.find(param, function(err, itemData) {
        if (err) console.log(err);
        console.log(itemData)



        controllerCallback(itemData);
      });
    } else {
      IntervieweeTestSuiteModel.find(function(err, collectionData) {
        //console.log(collectionData)
        if (err) console.log(err);
        console.log(collectionData.toString());

        controllerCallback(collectionData);
      });
    }
  },

  update: function(){
    //ToDo to implement
  },

  unset: function(){
    //ToDo to implement
  }
};

module.exports = model;

function getIntervieweeById(){
  //ToDo to implement
}

function getTetsSuiteById(){
  //ToDo to implement
}

//CMD

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
