"use strict";

var express = require("express");
var http = require("http");
var path = require("path");
var config = require("./config");

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


var intervieweeTestSuiteController = require("./controllers/intervieweeTestSuiteController");
var problemController = require("./controllers/problemController");
var timeController = require("./controllers/timeController");

http.createServer(app).listen(config.get("port"), function(){
  console.log("It works")

});

app.use(function(req, res, next){
  setHeaders(res);
  next();
});

app.use(function(req, res, next){
  if(req.url === "/getTestData"){
    var testSuite = intervieweeTestSuiteController.getTestSuite(1);
    testSuite.timer = timeController.set();
    var json = JSON.stringify(testSuite);
    res.end(json);

  }else{
    next();
  }
});

app.use(function(req, res, next){
  if(req.url === "/checkProblemSolution"){
    var response;

    if(timeController.get().remainingTime){
      response = problemController.checkUserSolution(req.body)
    }else{
      response = req.body;
    }

    res.end(JSON.stringify(response));
  }else{
    next();
  }
});

app.use(function(req, res, next){
  if(req.url === "/startTimer"){
    timeController.set();
    res.end(JSON.stringify(timeController.start()));
  }else{
    next()
  }
});

app.use(function(req, res, next){
  if(req.url === "/getTime"){
    console.log(JSON.stringify(timeController.get()));
    res.end(JSON.stringify(timeController.get()));
  }else{
    next()
  }
});

app.use(function(req, res, next){
  if(req.url === "/stopTimer"){
    res.end(JSON.stringify(timeController.stop()));
  }else{
    next()
  }
});


function setHeaders(res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
}







//var routes = require("./routes");

