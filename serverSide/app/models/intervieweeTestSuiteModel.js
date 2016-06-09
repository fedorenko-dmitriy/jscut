"use strict";
var _ = require("underscore");
var async = require("async");

var BaseModel = require("./BaseModel");

var IntervieweeTestSuiteSchema = require("../db/intervieweeTestSuiteSchema");
var TestSuiteSchema = require("../db/testSuiteSchema");
var IntervieweeSchema = require("../db/intervieweeSchema");
var ProblemSchema = require("../db/problemSchema");

var model = _.extend({
  getByIdAllData: function(controllerCallback, param){
    var self = this;

    console.log("id "+param.id);

    this.preparedData = {
      id : parseInt(param.id),
      interviewee: {},
      testSuite: {},
      solutions:[],
      problems: []
    };

    async.waterfall([
        _.bind(self.privateMethods.getIntervieweeTestSuiteData, self),

        _.bind(self.privateMethods.getTestSuiteData, self),

        _.bind(self.privateMethods.getIntervieweeData, self),

        _.bind(self.privateMethods.getProblemsData, self)

      ], function(err, result){
        if(err) throw(err);
        controllerCallback([self.preparedData]);
      }
    );
  },

  privateMethods: {

    getIntervieweeTestSuiteData: function(callback){
      //console.log("getIntervieweeTestSuiteData id: "+model.preparedData.id)

      model.getSchema().findOne({id:model.preparedData.id}, function(err, unpreparedData) {
        console.log(unpreparedData)
        if (err) console.log(err);

        callback(null, unpreparedData);
        //console.log("gotIntervieweeTestSuiteData")
      });
    },

    getTestSuiteData: function(unpreparedData, callback){
      model.getSchema("testSuiteSchema").findOne({id: unpreparedData.testSuite_id}, function(err, itemData){
        if(err) console.log(err);
        model.preparedData.testSuite = itemData;
        callback(null, unpreparedData);
      });
    },

    getIntervieweeData: function(unpreparedData, callback){
      model.getSchema("intervieweeSchema").findOne({id: unpreparedData.interviewee_id}, function(err, itemData){ //ToDo bad type change from string to integer
        if(err) console.log(err);
        model.preparedData.interviewee = itemData;
        callback(null, unpreparedData);
      });
    },

    getProblemsData: function(unpreparedData, callback){
      //ToDo move each into Problem Schema

      console.log(model.preparedData.testSuite)
      async.each(model.preparedData.testSuite.problems,
        function(problemId, eachCallback){
          model.getSchema("problemSchema").findOne({id:problemId}, function(err, itemData){
            if(err) console.log(err);
            model.preparedData.problems.push(itemData);
            eachCallback(err);
          });
        },
        function(err){
          delete model.preparedData.testSuite.problems;
          callback(null);
        }
      );
    }
  }
}, new BaseModel());

model.setSchema(IntervieweeTestSuiteSchema);
model.setSchema("testSuiteSchema", TestSuiteSchema);
model.setSchema("intervieweeSchema", IntervieweeSchema);
model.setSchema("problemSchema", ProblemSchema);

module.exports = model;
