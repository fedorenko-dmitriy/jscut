"use strict";
var _ = require("underscore");
var problemModel = require("../models/problemModel");

module.exports = {
  getById: function(req, res){
    problemModel.read(function(response){
      res.end(JSON.stringify(response))
    }, req.params);
  },

  getByQuery: function(req, res){
    console.log("req.query");
    console.log(req.query);
    problemModel.read(function(response){
      res.end(JSON.stringify(response));
    }, req.query);
  },

  post: function(req, res){
    var reqParams = (!_.isArray(req.body)) ? [req.body]: req.body;
    problemModel.create(function(response){
      res.end(JSON.stringify(response));
    }, reqParams);
  },

  put: function(req, res){
    console.log(req.body)
    problemModel.update(function(response){
      res.end(JSON.stringify(response));
    }, req.body);
  },

  deleteById: function(req, res){
    problemModel.remove(function(response){
      res.end(JSON.stringify(response))
    }, req.params);
  }
};


