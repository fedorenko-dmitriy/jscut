"use strict";

var mongoose = require("../../app/libs/mongoose");
var async = require("async");

var IntervieweeSchema = require("../../app/db/intervieweeSchema");
var IntervieweeSolutionSchema = require("../../app/db/intervieweeSolutionSchema");
var IntervieweeTestSuiteSchema = require("../../app/db/intervieweeTestSuiteSchema");
var ProblemSchema = require("../../app/db/problemSchema");
var TestSuiteSchema = require("../../app/db/testSuiteSchema");

var intervieweesData = require("../mocks/interviewees.json");
var intervieweeSolutionsData = require("../mocks/intervieweeSolutions.json");
var intervieweeTestSuitesData = require("../mocks/intervieweeTestSuites.json");
var problemsData = require("../mocks/problems.json");
var testSuitesData = require("../mocks/testSuites.json");

function dropDatabase(callback){
  var db = mongoose.connection.db;

  db.dropDatabase(function(err){
    if(err) throw err;
    console.log("DB is dropped");
    callback();
  });
}

function createTestDB (callback){
  async.series([
    function createIntervieweesCollection (callback){
      async.each(intervieweesData, function(item, callbackEach) {
        var intervieweeModel = new IntervieweeSchema(item);
        intervieweeModel.save(function(err, result) {
          if(err) throw(err);
          callbackEach(err, result);
        });
      },
      function(){
        console.log("intervieweesCollection is created");
        callback();
      });
    },

    function createIntervieweeSolutionsCollection (callback){
      async.each(intervieweeSolutionsData, function(item, callbackEach){
        var intervieweeSolutionModel = new IntervieweeSolutionSchema(item);
        intervieweeSolutionModel.save(function(err, result){
          if(err) throw(err);
          callbackEach(err, result);
        });
      },
      function(){
        console.log("intervieweeSolutionsCollection is created");
        callback();
      });
    },

    function createIntervieweeTestSuitesCollection (callback){
      async.each(intervieweeTestSuitesData, function(item, callbackEach){

        var intervieweeTestSuiteModel = new IntervieweeTestSuiteSchema(item);
        intervieweeTestSuiteModel.save(function(err, result){
          if(err) throw(err);
          callbackEach(err, result);
        });
      },
      function(){
        console.log("intervieweeTestSuitesCollection is created");
        callback();
      });
    },

    function createProblemsCollection(callback){
      async.each(problemsData, function(item, callbackEach){
        var problemModel = new ProblemSchema(item);
        problemModel.save(function(err, result){
          if(err) throw(err);

          callbackEach(err, result);
        });
      },
      function(){
        console.log("problemsCollection is created");
        callback();
      });
    },

    function createTestSuitesCollection(callback){
      async.each(testSuitesData, function(item, callbackEach){
        var testSuiteModel = new TestSuiteSchema(item);
        testSuiteModel.save(function(err, result){
          if(err) throw(err);
          //console.log(result.toString())
          callbackEach(err, result);
        });
      },
      function(){
        console.log("testSuitesCollection is created");
        callback();
      });
    }
  ], callback);
}

module.exports = function(externalCallback){
  async.series([
    dropDatabase,
    createTestDB
  ],function(err, result){
    if(err) throw err;

    console.log("New DB is created!!!!!!!!!!!!!!!!");
    externalCallback();
  });
};


