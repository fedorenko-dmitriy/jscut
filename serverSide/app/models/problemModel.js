"use strict";
var _ = require("underscore");
var problems = require("../db/problems");
var ProblemsModel = require("../db/problemsSchema");

var opts = require("optimist").argv;
var fs = require("fs");
var path = require("path");

//console.log(typeof ProblemsModel)

var model = {
  set: function(problemsData){
    console.log(problemsData);
    _.each(problemsData, function(problemData){
      var problemModel = new ProblemsModel(problemData);
      problemModel.save(function(err){
        if(err){
          console.log("problem isn't saved");
          console.log(err);
        }else{
          console.log("problem is saved");

        }
      })
    });
  },

  get: function(controllerCallback, param){
    if(param){
      ProblemsModel.find(param, function(err, problemData){
        if(err) console.log(err);
        controllerCallback([problemData]);
      });
    } else{
      ProblemsModel.find(function(err, problemsData){
        console.log(problemsData)
        if(err) console.log(err);
        controllerCallback(problemsData);
      });
    }
  },

  unset: function(){

  },

  unsetAll: function(){  //ToDo This method is only for development
    this.get(function(problemsData){
      _.each(problemsData, function(){
        problemsData.remove(function(err){
          if(err){
            console.log("problem isn't removed");
          }else{
            console.log("problem is removed");
          }
        })
      });
    });
  },

  checkUserSolution: function(problem){
    //    var checkingProblem = this.get(problem.id);
    //    var problemIsFailed = 0;
    //    var result;
    //
    //    if(_.isArray(problem.userSolution)){
    //      for(var i=0; i<problem.userSolution.length; i++){
    //        if(problem.type === "evaluate"){
    //          try {
    //            result = eval(problem.userSolution[i]);
    //          } catch (e) {
    //            result = false;
    //          }
    //        }else{
    //          result = problem.userSolution[i]
    //        }
    //
    //        console.log(result);
    //
    //        var problemSolution = _.isNaN(parseInt(result))
    //          ? result
    //          : parseInt(result);
    //
    //        console.log(checkingProblem);
    //        console.log(checkingProblem.rightSolution);
    //        console.log(checkingProblem.rightSolution.indexOf(problemSolution));
    //
    //        if(checkingProblem.rightSolution.indexOf(problemSolution) > -1){
    //          problemIsFailed += 1;
    //        }else{
    //          problemIsFailed = 0;
    //          break;
    //        }
    //      }
    //    }
    //
    //    if(_.isArray(problem.userSolution) && problem.userSolution.length && problemIsFailed === checkingProblem.rightSolution.length){
    //      problem.isSolved = checkingProblem.points;
    //    } else {
    //      problem.isSolved = 0;
    //    }
    //    console.log(problem.isSolved)
        return problem;
  }
};

module.exports = model;



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
    model.get(function(problemsData){
      console.log(problemsData.toString());
    }, {id: opts.id});
  }else{
    model.get(function(problemsData){
      console.log(problemsData.toString());
    });
  }
}
