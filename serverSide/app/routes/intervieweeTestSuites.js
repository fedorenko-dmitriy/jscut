"use strict";
var _ = require("underscore");
var intervieweeTestSuiteModel = require("../models/intervieweeTestSuiteModel");

module.exports = {
  getById: function(req, res){
    intervieweeTestSuiteModel.read(function(response){
      res.end(JSON.stringify(response))
    }, req.params);
  },

  getByIdAllData: function(req, res){
    intervieweeTestSuiteModel.getByIdAllData(function(response){
      res.end(JSON.stringify(response))
    }, req.params);
  },

  getByQuery: function(req, res){
    intervieweeTestSuiteModel.read(function(response){
      res.end(JSON.stringify(response));
    }, req.query);
  },

  post: function(req, res){
    var reqParams = (!_.isArray(req.body)) ? [req.body]: req.body;
    intervieweeTestSuiteModel.create(function(response){
      res.end(JSON.stringify(response));
    }, reqParams);
  },

  put: function(req, res){
    intervieweeTestSuiteModel.update(function(response){
      res.end(JSON.stringify(response));
    }, req.body);
  },

  deleteById: function(req, res){
    intervieweeTestSuiteModel.remove(function(response){
      res.end(JSON.stringify(response))
    }, req.params);
  }
};


