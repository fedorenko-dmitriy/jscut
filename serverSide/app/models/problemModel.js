"use strict";
var _ = require("underscore");
var problems = require("../db/problems");

module.exports = {
  checkUserSolution: function(problem){
    var checkingProblem = this.get(problem.id);
    var problemIsFailed = 0;
    var result;

    if(_.isArray(problem.userSolution)){
      for(var i=0; i<problem.userSolution.length; i++){
        if(problem.type === "evaluate"){
          try {
            result = eval(problem.userSolution[i]);
          } catch (e) {
            result = false;
          }
        }else{
          result = problem.userSolution[i]
        }

        console.log(result);

        var problemSolution = _.isNaN(parseInt(result))
          ? result
          : parseInt(result);

        console.log(checkingProblem);
        console.log(checkingProblem.rightSolution);
        console.log(checkingProblem.rightSolution.indexOf(problemSolution));

        if(checkingProblem.rightSolution.indexOf(problemSolution) > -1){
          problemIsFailed += 1;
        }else{
          problemIsFailed = 0;
          break;
        }
      }
    }

    if(_.isArray(problem.userSolution) && problem.userSolution.length && problemIsFailed === checkingProblem.rightSolution.length){
      problem.isSolved = checkingProblem.points;
    } else {
      problem.isSolved = 0;
    }
    console.log(problem.isSolved)
    return problem;
  },

  get: function(id){
    return _.findWhere(problems, {id: parseInt(id)});
  }
};


