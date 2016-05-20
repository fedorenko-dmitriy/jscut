"use strict";
var _ = require("underscore");
var async = require("async");

var BaseModel = require("./BaseModel");

var IntervieweeTestSuiteSchema = require("../db/intervieweeTestSuiteSchema");
var TestSuiteSchema = require("../db/testSuiteSchema");
var IntervieweeSchema = require("../db/intervieweeSchema");
var ProblemSchema = require("../db/problemSchema");

var model = _.extend({
  getById: function(controllerCallback, id){
    var responseData = [];

    console.log("id "+id);

    IntervieweeTestSuiteSchema.findOne({id:2}, function(err, itemData) {
      if (err) console.log(err);
      console.log(itemData.toString());

      var preparedItemData = {
        id : itemData.id,
        interviewee: {},
        testSuite: {},
        solutions:[]
      };
      var problems = [];

      async.parallel({
        interviewee: function(callback){
          getIntervieweeById(itemData.interviewee_id, callback);
        },
        testSuite: function(callback){
          getTestSuiteById(itemData.testSuite_id, callback);
        }
      }, function(err, result){
        if(err) console.log(err);

        preparedItemData.interviewee = result.interviewee;
        preparedItemData.testSuite = result.testSuite;
        console.log("bbbb")
        console.log(result);

        async.each(preparedItemData.testSuite.problems,
          function(problemId, eachCallback){
            getProblemById(problemId, problems, eachCallback);
          },
          function(err){
            preparedItemData.problems = problems;

            responseData.push(prepareTestSuiteData(preparedItemData));
            controllerCallback(responseData);

          }
        );
      });
    });
  }
}, new BaseModel());

module.exports = model;

function prepareTestSuiteData(preparedItemData){
  return preparedItemData;
}

function getIntervieweeById(id, callback){
  IntervieweeSchema.findOne({id:id}, function(err, itemData){ //ToDo bad type change from string to integer
    if(err) console.log(err);
    callback(err, itemData);
  });
}

function getTestSuiteById(id, callback){
  TestSuiteSchema.findOne({id: id}, function(err, itemData){
    if(err) console.log(err);
    callback(err, itemData);
  });
}

function getProblemById(id, problemsArr, callback){
  console.log("problemID")
  console.log(id);
  ProblemSchema.findOne({id:id}, function(err, itemData){
    if(err) console.log(err);
    problemsArr.push(itemData);
    callback(err);
  });
}
