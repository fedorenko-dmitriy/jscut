"use strict";
var _ = require("underscore");
var IntervieweeSolutionSchema = require("../db/intervieweeSolutionSchema");
var ProblemSchema = require("../db/problemSchema");

var baseModel = require("./baseModel");

var model = _.extend({
  checkIntervieweeSolution: function(controllerCallback, requestObj){
    var self = this;

    var problemId = requestObj.problem_id;
    var solutionToSave = {
      interviewee_id: requestObj.interviewee_id,
      problem_id: problemId,
      solution: requestObj.solution,
      isSolved: -1
    };
    ProblemSchema.findOne({id:problemId}, function(err, itemData){

      checkUserSolution(itemData, solutionToSave);

      console.log(solutionToSave);

      var model = self.schema(solutionToSave);
      model.save(function(err){
        if(err) console.log(err);
        controllerCallback([solutionToSave])
      });
    });
  }
}, baseModel);

model.setSchema(IntervieweeSolutionSchema);

module.exports = model;

var checkUserSolution = function checkUserSolution(checkingProblem, solutionObj){ //problem -- from user
                                                                                  //checkingProblem -- from db
      var problemIsFailed = 0;
      var result;

      if(_.isArray(solutionObj.solution)){
        for(var i=0; i < solutionObj.solution.length; i++){
          if(solutionObj.type === "evaluate"){
            try {
              result = eval(solutionObj.solution[i]);
            } catch (e) {
              result = false;
            }
          }else{
            result = solutionObj.solution[i]
          }

          console.log(result);

          var problemSolution = _.isNaN(parseInt(result))
            ? result
            : parseInt(result);

          //console.log(checkingProblem);
          //console.log(checkingProblem.solution);
          //console.log(checkingProblem.rightSolution.indexOf(problemSolution));

          if(checkingProblem.rightSolution.indexOf(problemSolution) > -1){
            problemIsFailed += 1;
          }else{
            problemIsFailed = 0;
            break;
          }
        }
      }

      if(_.isArray(solutionObj.solution) && solutionObj.solution.length && problemIsFailed === checkingProblem.rightSolution.length){
        solutionObj.isSolved = checkingProblem.points;
      } else {
        solutionObj.isSolved = 0;
      }
      console.log(solutionObj.isSolved);
  return solutionObj;
};
