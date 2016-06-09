"use strict";
var _ = require("underscore");
var intervieweeModel = require("../models/intervieweeModel");

module.exports = {
  getById: function(req, res){
    intervieweeModel.read(function(response){
      res.end(JSON.stringify(response))
    }, req.params);
  },

  getByQuery: function(req, res){
    intervieweeModel.read(function(response){
      res.end(JSON.stringify(response));
    }, req.query);
  },

  post: function(req, res){
    var reqParams = (!_.isArray(req.body)) ? [req.body]: req.body;
    intervieweeModel.create(function(response){
      res.end(JSON.stringify(response));
    }, reqParams);
  },

  put: function(req, res){
    intervieweeModel.update(function(response){
      res.end(JSON.stringify(response));
    }, req.body);
  },

  deleteById: function(req, res){
    intervieweeModel.remove(function(response){
      res.end(JSON.stringify(response))
    }, req.params);
  }
};


