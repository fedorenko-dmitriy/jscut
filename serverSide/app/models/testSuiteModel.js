"use strict";
var _ = require("underscore");
var TestSuitesModel = require("../db/testSuitesSchema");

var problemModel = require("./problemModel");

var opts = require("optimist").argv;
var fs = require("fs");
var path = require("path");


var model = {
  set: function(testSuitesData) {
    console.log(testSuitesData);
    _.each(testSuitesData, function(testSuiteData) {
      var TestSuiteModel = new TestSuitesModel(testSuiteData);
      TestSuiteModel.save(function(err) {
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
      TestSuitesModel.find(param, function(err, testSuiteData) {
        if (err) console.log(err);
        testSuiteData.problems = getProblemById(testSuiteData.problems);
        controllerCallback([testSuiteData]);
      });
    } else {
      TestSuitesModel.find(function(err, testSuitesData) {
        console.log(testSuitesData)
        if (err) console.log(err);

        _.each(testSuitesData, function(testSuiteData){
          testSuiteData.problems = getProblemById(testSuiteData.problems);
        });

        console.log(testSuitesData.toString());

        controllerCallback(testSuitesData);
      });
    }
  },

  unset: function() {

  },

  unsetAll: function() {  //ToDo This method is only for development
    this.get(function(testSuitesData) {
      _.each(testSuitesData, function() {
        testSuitesData.remove(function(err) {
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

function getProblemById(problems){
  var remapProblemsArr = [];
  _.each(problems, function(id){
    problemModel.get(function(problemData){
      remapProblemsArr.push(problemData[0])
    },{id:id});
  });

  return remapProblemsArr;
}

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
    model.get(function(testSuiteData){
      console.log(testSuiteData.toString());
    }, {id: opts.id});
  }else{
    model.get(function(testSuitesData){
      console.log(testSuitesData.toString());
    });
  }
}
