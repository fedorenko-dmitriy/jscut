"use strict";

var _ = require('underscore');
var opts = require('optimist').argv;
var fs = require('fs');


var intervieweeModel = require("./models/intervieweeModel");
var intervieweeSolutionModel = require("./models/intervieweeSolutionModel");
var intervieweeTestSuiteModel = require("./models/intervieweeTestSuiteModel");
var problemModel = require("./models/problemModel");
var testSuiteModel = require("./models/testSuiteModel");

// create row
// get row
// update row
// delete row
// drop table
// drop db -- optional

// node ./testSuiteAppCMD 'module name' 'action' 'param'
// param types
//  -nameColumn value (uses with CRUD of tables)
//  -path 'pathString' (uses when create and fill up a table)
//  -table 'tableName'



// get params
var moduleName;
var actionName;
var path;
var table;
var param;

moduleName = opts._[0];
actionName = opts._[1];
param = opts.param;
path = opts.path;

// switch case
var module;
var action;


switch(moduleName){
  case 'interviewee': module = intervieweeModel; break;
  case 'intervieweeSolution': module = intervieweeSolutionModel; break;
  case 'intervieweeTestSuite': module = intervieweeTestSuiteModel; break;
  case 'problem': module = problemModel; break;
  case 'testSuite': module = testSuiteModel; break;
  default : throw 'this module is undefined'; break;
}

switch (actionName){
  case 'set': action = 'create'; break;
  case 'get': action = 'read'; break;

  case 'update': action = 'update'; break;
  case 'delete': action = 'remove'; break;

  case 'createCollection': action = 'create'; break;
  case 'dropCollection': action = 'drop'; break;
}

if(path){
  var filePath = "/media/user/web_drive/PROJECT/JSCUT/serverSide/app/public/"+opts.path;
  console.log(filePath)
  fs.readFile(filePath, function(err, content){
    if(err) throw err;
    param = JSON.parse(content);
    executeModuleMethod(param);
  });
}else{
  if(!param && actionName !=="get"){
    console.log("params must be defined")
  }
  executeModuleMethod(param);
}

//console.log("param")
//console.log(param)
//console.log("======")

function executeModuleMethod(param){
  param = param || "";

  module[action](function(err, result){
    if(err) console.log(err);

    console.log("Module"+moduleName+" do "+actionName+"successful");
  },param);
};

