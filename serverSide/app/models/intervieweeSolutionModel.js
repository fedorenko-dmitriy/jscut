"use strict";
var _ = require("underscore");
var async = require("async");
var IntervieweeSolutionSchema = require("../db/intervieweeSolutionSchema");
var ProblemSchema = require("../db/problemSchema");

var BaseModel = require("./BaseModel");

var model = _.extend({
  checkIntervieweeSolution: function(controllerCallback, requestSolutionObj){
    var self = this;

    this.privateMethods.setRequestSolutionObj(requestSolutionObj[0]);

    async.waterfall([

      _.bind(self.privateMethods.getRightProblemSolution, self),

      _.bind(self.privateMethods.prepareIntervieweeProblemSolutions, self),

      _.bind(self.privateMethods.compareSolutions, self),

      _.bind(self.privateMethods.saveIntervieweeSolution, self)

    ], function(err, result){
      controllerCallback(result);
    });
  },

  privateMethods: {

    setRequestSolutionObj: function(requestSolutionObj){
      model.privateMethods.requestSolutionObj = requestSolutionObj;
    },

    getRightProblemSolution: function (callback){
      console.log("this.requestSolutionObj")
      console.log(model.privateMethods)
      model.getSchema("problemSchema").findOne({id:parseInt(model.privateMethods.requestSolutionObj.problem_id)}, function(err, itemData){
        if(err) throw err;
        callback(null, itemData.toObject())
      });
    },

    prepareIntervieweeProblemSolutions: function (itemData, callback){
      var preparedSolution = [];

      if(_.isArray(model.privateMethods.requestSolutionObj.solution)){
        for(var i=0; i < model.privateMethods.requestSolutionObj.solution.length; i++){
          var result;
          if(model.privateMethods.requestSolutionObj.type === "evaluate"){
            try {
              result = eval(model.privateMethods.requestSolutionObj.solution[i]);
            } catch (e) {
              throw e;
            }
          }else{
            result = model.privateMethods.requestSolutionObj.solution[i]
          }

          var problemSolution = _.isNaN(parseInt(result))
            ? result
            : parseInt(result);

          preparedSolution.push(problemSolution)
        }
      }

      var preparedSolutionObj = {
        interviewee_id: model.privateMethods.requestSolutionObj.interviewee_id,
        problem_id: model.privateMethods.requestSolutionObj.problem_id,
        testSuite_id: model.privateMethods.requestSolutionObj.testSuite_id,
        solution: preparedSolution,
        isSolved: -1
      };

      callback(null, itemData, preparedSolutionObj);
    },

    compareSolutions: function (itemData, preparedSolution, callback){
      var rightSolution = itemData["rightSolution"];
      var intervieweeSolution = preparedSolution["solution"];

      var problemsIsSolved = _.intersection(rightSolution, intervieweeSolution).length;
      console.log(problemsIsSolved)

      if(rightSolution.length === problemsIsSolved && rightSolution.length===intervieweeSolution.length){
        preparedSolution.isSolved = itemData.points;
      }else{
        preparedSolution.isSolved = 0;
      }

      callback(null, preparedSolution)
    },

    saveIntervieweeSolution: function (preparedSolutionObj, callback){
      model.getSchema().findOneAndUpdate(
        {
          interviewee_id: parseInt(preparedSolutionObj.interviewee_id),
          problem_id: parseInt(preparedSolutionObj.problem_id),
          testSuite_id: parseInt(preparedSolutionObj.testSuite_id)
        },
        preparedSolutionObj,
        {upsert:true, new: true},
        function(err, affectedData) {
          if(err) console.log(err);
          console.log()
          callback(err, _.omit(affectedData.toObject(), ['_id', "__v"]));
        }
      );
    }
  }
}, new BaseModel());

model.setSchema(IntervieweeSolutionSchema);
model.setSchema("problemSchema", ProblemSchema);

module.exports = model;
