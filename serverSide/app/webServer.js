"use strict";

var express = require("express");
var http = require("http");
var path = require("path");
var config = require("./config").init();



var app = express();

var bodyParser = require('body-parser');

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next){
  setHeaders(res);
  next();
});

require("./routes")(app);

//
//var timeController = require("./controllers/timerController");

http.createServer(app).listen(config.get("port"), function(){
  console.log("It works on port:"+config.get("port"))
  //require('../tests/mocks/createTestDB.js')(function(){})
});


function setHeaders(res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
}
