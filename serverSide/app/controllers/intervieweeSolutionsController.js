"use strict";
var _ = require("underscore");
var intervieweeSolutionModel = require("../models/intervieweeSolutionModel");

module.exports = {
  getById: function(req, res){
    intervieweeSolutionModel.read(function(response){
      res.end(JSON.stringify(response))
    }, req.params);
  },

  getByQuery: function(req, res){
    intervieweeSolutionModel.read(function(response){
      res.end(JSON.stringify(response));
    }, req.query);
  },

  post: function(req, res){
    var reqParams = (!_.isArray(req.body)) ? [req.body]: req.body;
    intervieweeSolutionModel.create(function(response){
      res.end(JSON.stringify(response));
    }, reqParams);
  },

  put: function(req, res){
    intervieweeSolutionModel.update(function(response){
      res.end(JSON.stringify(response));
    }, req.body);
  },

  deleteById: function(req, res){
    intervieweeSolutionModel.remove(function(response){
      res.end(JSON.stringify(response))
    }, req.params);
  },

  checkSolution: function(req, res){
    var reqParams = (!_.isArray(req.body)) ? [req.body]: req.body;
    intervieweeSolutionModel.checkIntervieweeSolution(function(response){
      console.log(response)
      res.end(JSON.stringify(response));
    }, reqParams);
  }
};


