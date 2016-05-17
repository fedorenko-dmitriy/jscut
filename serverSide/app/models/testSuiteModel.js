"use strict";
var _ = require("underscore");
var TestSuiteSchema = require("../db/testSuiteSchema");

var baseModel = require("./baseModel");

var problemModel = require("./problemModel");

var model = _.extend({
  get: function(controllerCallback, param) {
    if (param) {
      self.schema.find(param, function(err, testSuiteData) {
        if (err) console.log(err);
        testSuiteData.problems = getProblemById(testSuiteData.problems);
        controllerCallback([testSuiteData]);
      });
    } else {
      self.schema.find(function(err, testSuitesData) {
        console.log(testSuitesData)
        if (err) console.log(err);

        _.each(testSuitesData, function(testSuiteData){
          testSuiteData.problems = getProblemById(testSuiteData.problems);
        });

        console.log(testSuitesData.toString());

        controllerCallback(testSuitesData);
      });
    }
  }
}, baseModel);

model.setSchema(TestSuiteSchema);

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
