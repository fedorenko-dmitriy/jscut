"use strict";

var http = require('http'),
    url = require('url'),
    qs = require('querystring'),
    _ = require("underscore");

var intervieweeTestSuiteController = require("./controllers/intervieweeTestSuiteController");
var problemController = require("./controllers/problemController");
var timeController = require("./controllers/timeController");

var webServer = new http.Server(function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  var urlParsed = url.parse(req.url, true);

  var body = '';
  req.on('data', function (data) {
    body += data;

    // Too much POST data, kill the connection!
    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    if (body.length > 1e6)
      req.connection.destroy();
  });

  if(urlParsed.pathname == "/getTestData"){
    var testSuite = intervieweeTestSuiteController.getTestSuite(1);
    testSuite.timer = timeController.set();
    var json = JSON.stringify(testSuite);
    res.end(json);

  }
  else if(urlParsed.pathname == "/checkProblemSolution"){

    req.on('end', function () {
      var response;

      if(timeController.get().remainingTime){
        response = problemController.checkUserSolution(JSON.parse(body))
      }else{
        response = JSON.parse(body)
      }

      res.end(JSON.stringify(response));
    });
  }
  else if(urlParsed.pathname == "/startTimer"){
    timeController.set();
    res.end(JSON.stringify(timeController.start()));
  }
  else if(urlParsed.pathname == "/getTime"){
    console.log(JSON.stringify(timeController.get()));
    res.end(JSON.stringify(timeController.get()));
  }
  else if(urlParsed.pathname == "/stopTimer"){
    res.end(JSON.stringify(timeController.stop()));
  }
});

webServer.listen(8080, '127.0.0.1');
console.log("webServer started on 127.0.0.1:8080");

