"use strict";
var _ = require("underscore");
var testSuiteModel = require("../models/testSuiteModel");

module.exports = {
  getById: function(req, res){
    testSuiteModel.read(function(response){
      res.end(JSON.stringify(response))
    }, req.params);
  },

  getByQuery: function(req, res){
    console.log("req.query1");
    console.log(req.query);
    testSuiteModel.read(function(response){
      console.log(response)
      res.end(JSON.stringify(response));
    }, req.query);
  },

  post: function(req, res){
    var reqParams = (!_.isArray(req.body)) ? [req.body]: req.body;
    testSuiteModel.create(function(response){
      res.end(JSON.stringify(response));
    }, reqParams);
  },

  put: function(req, res){
    testSuiteModel.update(function(response){
      res.end(JSON.stringify(response));
    }, req.body);
  },

  deleteById: function(req, res){
    testSuiteModel.remove(function(response){
      res.end(JSON.stringify(response))
    }, req.params);
  }
};


