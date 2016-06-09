"use strict";

var express = require("express");
var http = require("http");
var path = require("path");
var config = require("../../app/config").init("testConfig");

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
  setHeaders(res);
  next();
});

require("../../app/routes")(app);

module.exports = http.createServer(app).listen(config.get("port"), function(){
  console.log("It works on port:"+config.get("port"));
});

function setHeaders(res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
}
